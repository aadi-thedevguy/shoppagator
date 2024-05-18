import { z } from "zod";
import { authRouter } from "./auth-router";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { QueryValidator } from "../lib/validators/query-validator";
import { ReviewValidator } from "../lib/validators/review-validator";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./payment-router";
import payload from "payload";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,
  review: privateProcedure
    .input(ReviewValidator)
    .mutation(async ({ input }) => {
      const { comment, user, rating, email, product } = input;

      // check if the user already reviewed this product
      const { docs } = await payload.find({
        collection: "reviews",
        where: {
          user: {
            equals: user,
          },
        },
      });
      if (docs.length) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You've already reviewed this product",
        });
      }

      try {
        await payload.create({
          collection: "reviews",
          data: {
            email,
            user,
            product,
            comment,
            rating,
          },
        });

        return { success: true };
      } catch (error) {
        if (error instanceof Error) return { message: error.message };
      }
    }),

  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;

      const payload = await getPayloadClient();

      const parsedQueryOpts: Record<string, { equals: string }> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

export type AppRouter = typeof appRouter;
