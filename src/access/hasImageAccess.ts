import type { Access, User } from "payload";

export const isAdminOrHasAccessToImages =
    (): Access =>
        async ({ req }) => {
            const user = req.user as User | undefined;

            if (!user) return false;
            if (user.role === "admin") return true;

            return {
                user: {
                    equals: req?.user?.id,
                },
            };
        };