"use server";

import { FeedbackEmailHtml } from "@/components/emails/Feedback";
import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { ContactValidator } from "@/validators/contact-form-validator";
import { convertZodErrors } from "@/utilities/formatZodErrors";

export async function contact(input: unknown) {
    const validated = ContactValidator.safeParse(input);

    if (!validated.success) {
        const errors = convertZodErrors(validated.error);
        return {
            success: false,
            errors
        }
    }
    const { description, email, title } = validated.data;

    const payload = await getPayload({ config: configPromise });
    try {
        await payload.sendEmail({
            from: `Shoppagator <${process.env.SMTP_USER}>`,
            to: ["thedevguy99@gmail.com"],
            subject: title,
            html: FeedbackEmailHtml({
                feedback: description,
                username: email.split("@")[0],
                email,
            }),
        });

        return {
            success: true,
        };
    } catch (error) {
        if (error instanceof Error) {
            // throw new Error("Failed to Submit, Try Again Later");
            return {
                success: false,
                message: error.message
            }
        }
        return {
            success: false,
            message: "Failed to Submit, Try Again Later"
        }
    }
}