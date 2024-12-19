import {
  AuthCredentialsValidator,
  forgotValidator,
  resetValidator,
} from "../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { ZodError, z } from "zod";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { name, email, password } = input;
      const payload = await getPayloadClient();

      // check if user already exists
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });

      if (!name) throw new TRPCError({ code: "FORBIDDEN" });

      await payload.create({
        collection: "users",
        data: {
          email,
          password,
          name,
          role: "user",
        },
      });

      return { success: true, sentToEmail: email };
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;

      const payload = await getPayloadClient();

      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });

      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { success: true };
    }),

  forgotPassword: publicProcedure
    .input(forgotValidator)
    .mutation(async ({ input }) => {
      const { email } = input;
      const payload = await getPayloadClient();

      // check if user already exists
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length === 0) throw new TRPCError({ code: "CONFLICT" });

      const token = await payload.forgotPassword({
        collection: "users",
        data: {
          email,
        },
        disableEmail: false, // you can disable the auto-generation of email via local API
      });

      return { success: true, token };
    }),

  resetPassword: publicProcedure
    .input(resetValidator)
    .mutation(async ({ input }) => {
      const { token, password } = input;
      if (!token) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const payload = await getPayloadClient();
      await payload.resetPassword({
        collection: "users",
        data: {
          token,
          password,
        },
        overrideAccess: true,
      });

      return { success: true };
    }),

  signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;

      const payload = await getPayloadClient();

      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });

        return { success: true };
      } catch (err) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
