import { z } from "zod";

export const ReviewValidator = z.object({
  email: z.string().email(),
  comment: z
    .string()
    .min(8, {
      message: "Review must be at least 8 characters long.",
    })
    .max(250),
  rating: z.number().min(1).max(5),
  product: z.string().min(10),
  user: z.string().min(10),
});

export type TReviewValidator = z.infer<typeof ReviewValidator>;
