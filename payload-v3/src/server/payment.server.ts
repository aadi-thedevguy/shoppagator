"use server";

import { getMeUser } from "@/utilities/getMeUser";
import payloadConfig from "@payload-config";
import { getPayload } from "payload";
import Stripe from "stripe";
import { stripe } from "./stripe";

export async function createCheckoutSession(input: { productIds: string[] }) {
    await getMeUser({ nullUserRedirect: "/login" });
    const { user } = await getMeUser();

    if (input.productIds.length === 0) {
        throw new Error("BAD_REQUEST");
    }

    const payload = await getPayload({ config: payloadConfig });

    const { docs: products } = await payload.find({
        collection: "products",
        where: {
            id: {
                in: input.productIds,
            },
        },
    });

    const filteredProducts = products.filter((prod) => Boolean(prod.priceId));

    const order = await payload.create({
        collection: "orders",
        data: {
            _isPaid: false,
            products: filteredProducts.map((prod) => prod.id),
            user: user.id,
        },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    filteredProducts.forEach((product) => {
        line_items.push({
            price: product.priceId!,
            quantity: 1,
        });
    });

    try {
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
            payment_method_types: ["card"],
            mode: "payment",
            metadata: {
                userId: user.id,
                orderId: order.id,
            },
            line_items,
        });


        return { url: stripeSession.url };

    } catch (err) {
        console.error(err);
        return { url: null, error: { message: "Something went wrong. Please try again." } };
    }
}

export async function pollOrderStatus(input: { orderId: string }) {
    await getMeUser({ nullUserRedirect: "/login" });

    const payload = await getPayload({ config: payloadConfig });

    const { docs: orders } = await payload.find({
        collection: "orders",
        where: {
            id: {
                equals: input.orderId,
            },
        },
    });

    if (!orders.length) {
        throw new Error("ORDER NOT FOUND");
    }

    const [order] = orders;

    return { isPaid: order._isPaid };
}