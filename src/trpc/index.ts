import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "../lib/validators/query-validator";
import { ContactValidator } from "../lib/validators/contact-form-validator";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./payment-router";
import { reviewRouter } from "./review-router";
import { FeedbackEmailHtml } from "../components/emails/Feedback";
import payload from "payload";

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,
  review: reviewRouter,

  contact: publicProcedure
    .input(ContactValidator)
    .mutation(async ({ input }) => {
      const { description, email, title } = input;

      try {
        await payload.sendEmail({
          from: `Shopaggator <${process.env.SUPPORT_EMAIL}>`,
          to: [process.env.ADMIN_EMAIL as string],
          subject: title,
          html: FeedbackEmailHtml({
            feedback: description,
            username: email.split("@")[0],
            email,
          }),
        });

        return {
          success: true,
        };
      } catch (error) {
        if (error instanceof Error) {
          //   throw new TRPCError({
          //     code: "BAD_REQUEST",
          //     message: "Please Check Your Email Address",
          //   });
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message || "Failed to Submit, Try Again Later",
          });
        }
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
