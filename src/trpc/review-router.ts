import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { ReviewValidator } from "../lib/validators/review-validator";
import payload from "payload";
import { TRPCError } from "@trpc/server";
import Filter from "bad-words";

const filter = new Filter();

export const reviewRouter = router({
  create: privateProcedure
    .input(ReviewValidator)
    .mutation(async ({ input }) => {
      const { user, rating, product, comment } = input;

      // check if the user already reviewed this product
      const { docs: existingReviews } = await payload.find({
        collection: "reviews",
        where: {
          user: {
            equals: user,
          },
        },
      });

      if (existingReviews.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You've already reviewed this product",
        });
      }

      const { docs } = await payload.find({
        collection: "orders",
        where: {
          user: {
            equals: user,
          },
        },
      });
      if (docs.length <= 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You haven't purchased this product",
        });
      }

      const isProfane = filter.isProfane(comment);

      await payload.create({
        collection: "reviews",
        data: {
          user,
          product,
          comment,
          rating,
          is_verified: isProfane,
        },
      });

      return { success: true };
    }),
});
