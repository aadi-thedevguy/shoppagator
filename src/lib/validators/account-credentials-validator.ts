import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});
export const forgotValidator = z.object({
  email: z.string().email(),
});
export const resetValidator = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
    token: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"], // This puts the error at confirmPassword
  });

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
export type TForgotValidator = z.infer<typeof forgotValidator>;
export type TResetValidator = z.infer<typeof resetValidator>;
