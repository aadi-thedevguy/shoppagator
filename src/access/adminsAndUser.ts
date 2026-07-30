import type { Access } from "payload";

export const adminsAndUser: Access = ({ req: { user } }) => {
    if (user?.role === "admin") return true;

    return {
        id: {
            equals: user?.id,
        },
    };
};