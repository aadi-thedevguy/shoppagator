"use server";

import { getPayloadClient } from "@/get-payload";

export async function getProduct(productId: string) {
  const payload = await getPayloadClient();

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

export async function getPolicyPage(slug: string) {
  const payload = await getPayloadClient();

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
  const payload = await getPayloadClient();

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
