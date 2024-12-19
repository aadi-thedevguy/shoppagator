"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import { convertZodErrors } from "@/utilities/formatZodErrors";
import { QueryValidator, TQueryValidator } from "@/validators/query-validator";
import { number, unknown } from "zod";

export async function getProduct(productId: string) {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });

  return docs[0];
}

export async function getOrder(orderId: string) {
  const payload = await getPayload({ config: configPromise });


  const { docs } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });
  return docs[0];
}

export async function getPolicyPage(slug: string) {
  const payload = await getPayload({ config: configPromise });


  const doc = await payload.findGlobal({
    slug: "policy",
  });

  if (!doc) {
    throw new Error(`No document found for slug: ${slug}`);
  }

  if (slug === "privacy-policy") {
    return doc.privacy_policy;
  } else if (slug === "tos") {
    return doc.terms_of_service;
  } else if (slug === "cookie") {
    return doc.cookie_policy;
  } else {
    return null;
  }
}

export async function getReviewStats(productId: string) {
  const payload = await getPayload({ config: configPromise });

  const { docs: reviews } = await payload.find({
    // TODO: pagination
    collection: "reviews",
    where: {
      product: {
        equals: productId,
      },
      is_verified: { equals: true },
    },
  });

  // if (!doc) {
  //   throw new Error(`No document found for slug`);
  // }
  const totalRating = reviews.reduce(
    (total, review) => total + review.rating,
    0
  );
  const averageRating = totalRating / reviews.length || 0;

  const ratingCounts: Record<string, number> = {
    // n stars reviews : given by x people
  };

  for (const review of reviews) {
    const rating = `${review.rating}`;
    if (rating !== "0") {
      ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
    }
  }

  return {
    averageRating,
    reviews,
    ratingCounts,
  };
}



export async function getInfiniteProducts({
  cursor = 1,
  query
}: {
  cursor: number
  query: TQueryValidator
}) {
  const validated = QueryValidator.safeParse(query);

  if (!validated.success) {
    throw new Error(validated.error.message);
  }
  const { sort, limit, ...queryOpts } = validated.data;

  const parsedQueryOpts: Record<string, { equals: string }> = {};

  Object.entries(queryOpts).forEach(([key, value]) => {
    parsedQueryOpts[key] = {
      equals: value,
    };
  });

  const payload = await getPayload({ config: configPromise });
  try {
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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to Submit, Try Again Later");
  }
}

