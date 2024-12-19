import { GlobalConfig } from "payload";

export const Policy: GlobalConfig = {
    slug: "policy",
    admin: {
        hidden: ({ user }) => user?.role !== "admin",
    },
    fields: [
        {
            name: "privacy_policy",
            label: "Privacy Policy",
            type: "richText",
        },
        {
            name: "terms_of_service",
            label: "Terms of Service",
            type: "richText",
        },
        {
            name: "cookie_policy",
            label: "Cookie Policy",
            type: "richText",
        },
    ],
};
