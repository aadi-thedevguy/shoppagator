import type { CollectionConfig } from "payload";
import { isAdminOrHasAccessToImages } from "@/access/hasImageAccess";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: async ({ req }) => {
      const referer = req.headers.get("referer");

      if (!req.user || !referer?.includes("sell")) {
        return true;
      }

      return await isAdminOrHasAccessToImages()({ req });
    },
    delete: isAdminOrHasAccessToImages(),
    update: isAdminOrHasAccessToImages(),
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req?.user?.id };
      },
    ],
  },
  admin: {
    hidden: ({ user }) => user?.role !== "admin",
  },
  upload: {
    staticDir: "media",
    adminThumbnail: "thumbnail",
    disableLocalStorage: true,
    mimeTypes: ["image/*"],
  },
};
