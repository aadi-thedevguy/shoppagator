import { GlobalConfig } from "payload/types";

export const Policy: GlobalConfig = {
  slug: "policy",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  fields: [
    {
      name: "privacy_policy",
      label: "Privacy Policy",
      type: "richText",
      required: true,
      // defaultValue :
    },
    {
      name: "terms_of_service",
      label: "Terms of Service",
      type: "richText",
      required: true,
      // defaultValue :
    },
    {
      name: "cookie_policy",
      label: "Cookie Policy",
      type: "richText",
      required: true,
      // "We Use Cookies for a number of our services including Analytics on our customer behavior in order to provide the most personalized experience possible, however if you want to opt out of cookies click the 'Deny' button below, Remember, some cookies are necessary to provide you with our Services and may not work properly if disabled.",
    },
  ],
};
