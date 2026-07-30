import { User } from "@/payload-types";
import { Access } from "payload";

export const isAdminOrHasAccess =
    (): Access =>
        ({ req: { user: _user } }) => {
            const user = _user as User | undefined;

            if (!user) return false;
            if (user.role === "admin") return true;

            const userProductIDs = (user.products || []).reduce<Array<string>>(
                (acc, product) => {
                    if (!product) return acc;
                    if (typeof product === "string") {
                        acc.push(product);
                    } else {
                        acc.push(product.id);
                    }

                    return acc;
                },
                []
            );

            return {
                id: {
                    in: userProductIDs,
                },
            };
        };