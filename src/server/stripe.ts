import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Lazily initialize the Stripe client.
 *
 * The Stripe SDK throws `Neither apiKey nor config.authenticator provided`
 * when constructed with an empty/undefined key. By deferring construction
 * until first use (instead of at module-evaluation time), we avoid breaking
 * the Next.js build's "collecting page data" phase when the env var isn't
 * available at build time.
 */
export function getStripe(): Stripe {
  if (stripeClient) {
    return stripeClient;
  }

  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey) {
    throw new Error(
      "STRIPE_SECRET_KEY environment variable is not set. " +
        "Configure it before performing Stripe operations.",
    );
  }

  stripeClient = new Stripe(apiKey, {
    // @ts-ignore
    apiVersion: "2024-04-10",
    typescript: true,
  });

  return stripeClient;
}