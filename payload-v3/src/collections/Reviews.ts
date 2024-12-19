import { adminsAndUser } from "@/access/adminsAndUser";
import { isAdmin } from "@/access/isAdmin";
import { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  access: {
    read: adminsAndUser,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },
  fields: [
    {
      name: "is_verified",
      type: "checkbox",
      defaultValue: false,
      access: {
        read: ({ req }) => req?.user?.role === "admin",
        update: ({ req }) => req?.user?.role === "admin",
      },
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: "comment",
      type: "text",
      maxLength: 250,
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
    },
  ],
};
