import { PrimaryActionEmailHtml } from "../../components/emails/PrimaryActionEmail";
import { ResetEmailHtml } from "../../components/emails/ResetMail";
import { Access, CollectionConfig } from "payload/types";
import { customerProxy } from "../endpoints/customer";
import { CustomerSelect } from "./CustomerSelect";
import { createStripeCustomer } from "./hooks/createStripeCustomer";

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;

  return {
    id: {
      equals: user.id,
    },
  };
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "verify your account",
          buttonText: "Verify Account",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
        });
      },
    },
    forgotPassword: {
      // @ts-ignore
      generateEmailHTML: ({ token, user }) => {
        return ResetEmailHtml({
          username: user.email.split("@")[0],
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}`,
        });
      },
    },
    maxLoginAttempts: 3,
    lockTime: 3600 * 10,
  },
  access: {
    read: adminsAndUser,
    create: () => true,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  hooks: {
    beforeChange: [createStripeCustomer],
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email"],
    hidden: ({ user }) => user.role !== "admin",
  },

  endpoints: [
    {
      path: "/:teamID/customer",
      method: "get",
      handler: customerProxy,
    },
    {
      path: "/:teamID/customer",
      method: "patch",
      handler: customerProxy,
    },
  ],
  fields: [
    {
      name: "products",
      label: "Products",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "product_files",
      label: "Product files",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "product_files",
      hasMany: true,
    },
    {
      name: "role",
      defaultValue: "user",
      required: true,

      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
    {
      name: "name",
      type: "text",
    },
    {
      name: "stripeCustomerID",
      label: "Stripe Customer",
      type: "text",
      access: {
        read: ({ req: { user } }) => user.role === "admin",
      },
      admin: {
        position: "sidebar",
        components: {
          Field: CustomerSelect,
        },
      },
    },
    {
      name: "skipSync",
      label: "Skip Sync",
      type: "checkbox",
      admin: {
        position: "sidebar",
        readOnly: true,
        hidden: true,
      },
    },
  ],
  timestamps: true,
};
