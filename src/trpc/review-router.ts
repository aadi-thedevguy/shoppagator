import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { ReviewValidator } from "../lib/validators/review-validator";
import payload from "payload";
import { TRPCError } from "@trpc/server";

export const reviewRouter = router({
  create: privateProcedure
    .input(ReviewValidator)
    .mutation(async ({ input }) => {
      const { user, rating, product, comment } = input;

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
});
