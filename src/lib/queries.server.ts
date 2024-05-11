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
    collection: "reviews",
    where: {
      product: {
        equals: productId,
      },
    },
  });

  // if (!doc) {
  //   throw new Error(`No document found for slug`);
  // }
  const totalRating = reviews.reduce(
    (total, review) => total + review.rating,
    0
  );
  const averageRating = totalRating / reviews.length;

  // const ratingCounts: Record<string, number> = {
  //   "1 star": 0,
  //   "2 stars": 0,
  //   "3 stars": 0,
  //   "4 stars": 0,
  //   "5 stars": 0,
  // };

  // for (const review of reviews) {
  //   ratingCounts[`${review.rating}`]++;
  // }

  return {
    averageRating,
    // ratingCounts,
  };
}
