import { adminsAndUser } from "@/access/adminsAndUser";
import { isAdmin } from "@/access/isAdmin";
import { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    // useAsTitle: "Your Orders",
    // description: "A summary of all your orders on Shoppagator.",
  },
  access: {
    read: adminsAndUser,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },
  fields: [
    {
      name: "_isPaid",
      label: "Payment Completed",
      type: "checkbox",
      access: {
        create: ({ req }) => req?.user?.role === "admin",
        read: ({ req }) => req?.user?.role === "admin",
      },
      // admin: {
      //   hidden: true,
      // },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      admin: {
        hidden: true,
      },
      relationTo: "users",
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: true,
    },
  ],
};
