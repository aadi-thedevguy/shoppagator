"use server";

import { convertZodErrors } from "@/utilities/formatZodErrors";
import { ReviewValidator } from "@/validators/review-validator";
import payloadConfig from "@payload-config";
import { getPayload } from "payload";
import { Filter } from "bad-words"
import { getMeUser } from "@/utilities/getMeUser";

const filter = new Filter();

export async function createReview(input: unknown) {
    await getMeUser({
        nullUserRedirect: "/sign-in"
    })
    const validated = ReviewValidator.safeParse(input);

    if (!validated.success) {
        const errors = convertZodErrors(validated.error);
        return {
            success: false,
            errors
        }
    }
    const { user, rating, product, comment } = validated.data;

    const payload = await getPayload({ config: payloadConfig });
    // check if the user already reviewed this product
    const { docs: existingReviews } = await payload.find({
        collection: "reviews",
        where: {
            user: {
                equals: user,
            },
        },
        sort: "desc",
    });

    if (existingReviews.length > 0) {
        throw new Error(
            "You've already reviewed this product",
        );
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
        throw new Error(
            "You haven't purchased this product");
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
}