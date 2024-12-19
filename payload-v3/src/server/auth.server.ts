"use server";

import configPromise from "@/payload.config";
import { z } from "zod";
import { AuthCredentialsValidator, forgotValidator, resetValidator } from "@/validators/account-credentials-validator";
import { getPayload } from "payload";
import { convertZodErrors } from "@/utilities/formatZodErrors";
import { redirect } from "next/navigation";

export const signUp = async (input: unknown) => {
    const validated = AuthCredentialsValidator.safeParse(input);

    if (!validated.success) {
        const errors = convertZodErrors(validated.error);
        return {
            success: false,
            errors,
            message: 'Validation Failed'
        }
    }

    const { name, email, password } = validated.data;
    const payload = await getPayload({ config: configPromise });

    try {
        // check if user already exists
        const { docs: users } = await payload.find({
            collection: "users",
            where: {
                email: {
                    equals: email,
                },
            },
        });

        if (users.length !== 0) {
            return {
                success: false,
                message: 'This email is already in use. Sign in instead?',
            }
        }

        if (!name) {
            return {
                success: false,
                message: 'User name is required',
            }
        }

        await payload.create({
            collection: "users",
            data: {
                email,
                password,
                name,
                role: "user",
            },
        });

        return { success: true, sentToEmail: email, message: 'Successfully signed up' };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
            }
        }
        return {
            success: false,
            message: 'Internal server error',
        }
    }
};

export const signIn = async (input: unknown) => {
    const validated = AuthCredentialsValidator.safeParse(input);

    if (!validated.success) {
        const errors = convertZodErrors(validated.error);
        return {
            success: false,
            errors,
            message: ''
        }
    }

    const { email, password } = validated.data;
    const payload = await getPayload({ config: configPromise });

    try {
        await payload.login({
            collection: "users",
            data: {
                email,
                password,
            },
        });

        return { success: true, message: 'Successfully logged in', errors: {} };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
                errors: {}
            }
        }
        return {
            success: false,
            message: 'Internal server error',
            errors: {}
        }
    }
};

export const verifyEmail = async (input: unknown) => {
    const validated = z.object({ token: z.string() }).safeParse(input);

    if (!validated.success) {
        throw new Error(validated.error.issues[0].message);
    }

    const { token } = validated.data;
    const payload = await getPayload({ config: configPromise });

    try {
        const isVerified = await payload.verifyEmail({
            collection: "users",
            token,
        });

        if (!isVerified) {
            throw new Error("Invalid token");
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Internal server error: ${error.message}`);
        }
    }
};

export const forgotPassword = async (input: unknown) => {
    const validated = forgotValidator.safeParse(input);

    if (!validated.success) {
        return {
            errors: validated.error.issues[0].message
        }
    }

    const { email } = validated.data;
    const payload = await getPayload({ config: configPromise });

    try {

        await payload.forgotPassword({
            collection: "users",
            data: {
                email,
            },
            disableEmail: false, // you can disable the auto-generation of email via local API
        });

        return {
            errors: ''
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: error.message,
            }
        }
        return {
            errors: 'Internal server error',
        }
    }
};

export const resetPassword = async (input: unknown) => {
    const validated = resetValidator.safeParse(input);

    if (!validated.success) {
        const errors = convertZodErrors(validated.error);
        return {
            success: false,
            errors,
            message: ''
        }
    }

    const { password, token } = validated.data;

    const payload = await getPayload({ config: configPromise });
    try {
        await payload.resetPassword({
            collection: "users",
            data: {
                token,
                password,
            },
            overrideAccess: true,
        });

        return {
            success: true,
            message: 'Successfully reset your password',
            errors: {}
        }


    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
                errors: {}
            }
        }
        return {
            success: false,
            message: 'Unable to Reset Your Password at the moment, Try Again Later',
            errors: {}
        }
    }
};