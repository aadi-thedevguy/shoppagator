import { User } from "../../payload-types";
import { Access, CollectionConfig } from "payload";
import { addUser, syncProduct } from "./hooks";
import { isAdmin } from "@/access/isAdmin";

const yourOwnAndPurchased: Access = async ({ req }) => {
  const user = req.user as User | null;

  if (user?.role === "admin") return true;
  if (!user) return false;

  const { docs: products } = await req.payload.find({
    collection: "products",
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const ownProductFileIds = products.map((prod) => prod.product_files).flat();

  const { docs: orders } = await req.payload.find({
    collection: "orders",
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const purchasedProductFileIds = orders
    .map((order) => {
      return order.products.map((product) => {
        if (typeof product === "string")
          return req.payload.logger.error(
            "Search depth not sufficient to find purchased file IDs"
          );
        if (Array.isArray(product.product_files)) {
          // Handle the case where product_files is an array
          return product.product_files;
        }

        // return typeof product.product_files === "string"
        //   ? product.product_files
        //   : product.product_files.id;
      });
    })
    .filter(Boolean)
    .flat();

  return {
    id: {
      in: [...ownProductFileIds, ...purchasedProductFileIds],
    },
  };
};

export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: ({ user }) => user?.role !== "admin",
  },
  hooks: {
    beforeChange: [addUser],
    beforeDelete: [syncProduct],
  },
  access: {
    read: yourOwnAndPurchased,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: {
    // staticURL: "/product_files",
    // staticDir: "product_files",
    disableLocalStorage: true,
    mimeTypes: [
      "image/*",
      "application/x-zip-compressed",
      "application/vnd.ms-excel",
      "application/pdf",
    ],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        condition: () => false,
      },
      hasMany: false,
      required: true,
    },
  ],
};
