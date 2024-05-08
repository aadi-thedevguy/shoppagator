import { getPayloadClient } from "@/get-payload";

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
  }
}
