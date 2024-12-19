import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  name: z
    .string()
    .toLowerCase()
    .regex(/^[^@#$%^&*!~`|]+$/i, {
      message: "Username shouldn't include characters like @,#,$ etc.",
    })
    .min(3)
    .max(20, { message: "Username should not exceed 20 characters" })
    .optional(),
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
    token: z.string().min(8).optional(),
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
