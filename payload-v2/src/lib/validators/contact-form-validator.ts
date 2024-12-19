import { z } from "zod";

export const ContactValidator = z.object({
  email: z.string().email(),
  title: z
    .string()
    .min(8, {
      message: "Subject must be at least 8 characters long.",
    })
    .max(30),
  description: z
    .string()
    .min(8, {
      message: "Query must be at least 8 characters long.",
    })
    .max(350),
});

export type TContactValidator = z.infer<typeof ContactValidator>;
