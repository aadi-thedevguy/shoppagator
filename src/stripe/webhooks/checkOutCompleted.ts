import type Stripe from "stripe";
import type { StripeWebhookHandler } from "@payloadcms/plugin-stripe/dist/types";
import { ReceiptEmailHtml } from "../../components/emails/ReceiptEmail";
import { transporter } from "../../get-payload";
import { Product } from "../../payload-types";

const logs = true;
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_SERVER,
//   secure: false,
//   port: 587,
//   auth: {
//     user: process.env.EMAIL_USER,
//     // pass: process.env.RESEND_API_KEY,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

export const checkOutCompleted: StripeWebhookHandler<{
  data: {
    object: Stripe.Checkout.Session;
  };
}> = async (args) => {
  const { event, payload, stripe } = args;
  const session = event.data.object;

  if (logs)
    payload.logger.info(
      `🪝 A checkout was completeed in Stripe on ${session.id}`
    );

  if (!session?.metadata?.userId || !session?.metadata?.orderId) {
    payload.logger.error(`Webhook Error: No user present in metadata`);
    return;
  }
  try {
    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        id: {
          equals: session.metadata.userId,
        },
      },
    });

    const [user] = users;
    if (!user) {
      payload.logger.error("No such user exists.");
      return;
    }

    const { docs: orders } = await payload.find({
      collection: "orders",
      depth: 2,
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    const [order] = orders;
    if (!order) {
      payload.logger.error("No such order exists.");
      return;
    }

    await payload.update({
      collection: "orders",
      data: {
        _isPaid: true,
      },
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    // send receipt
    const options = {
      from: "Shopaggator <support@thedevguy.in>",
      to: [user.email],
      subject: "Thanks for your order! This is your receipt.",
      html: ReceiptEmailHtml({
        date: new Date(),
        email: user.email,
        orderId: session.metadata.orderId,
        products: order.products as Product[],
      }),
    };
    const { messageId } = await transporter.sendMail(options);
    if (logs)
      payload.logger.info(
        `✅ Successfully send checkout mail, message ID : ${messageId}`
      );
  } catch (error: unknown) {
    payload.logger.error(`- Error updating product price: ${error}`);
  }

  payload.logger.info(`✅ Successfully completed checkout `);
};
