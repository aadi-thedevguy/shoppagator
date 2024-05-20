import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import seo from "@payloadcms/plugin-seo";
import dotenv from "dotenv";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { Users } from "./collections/Users";
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";
import { ProductFiles } from "./collections/ProductFile";
import { Orders } from "./collections/Orders";
import { Policy } from "./collections/Globals/Policy";
import { Reviews } from "./collections/Orders/Reviews";
import { customersProxy } from "./collections/endpoints/customer";
import { productsProxy } from "./collections/endpoints/products";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Products, Media, ProductFiles, Orders, Reviews],
  globals: [Policy],
  routes: {
    admin: "/sell",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- Shopaggator",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
  },
  rateLimit: {
    max: 2000,
    trustProxy: true,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  cors: [
    "https://checkout.stripe.com",
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
  ].filter(Boolean),
  csrf: [
    "https://checkout.stripe.com",
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
  ].filter(Boolean),
  endpoints: [
    // {
    //   path: "/create-payment-intent",
    //   method: "post",
    //   handler: createPaymentIntent,
    // },
    {
      path: "/stripe/customers",
      method: "get",
      handler: customersProxy,
    },
    {
      path: "/stripe/products",
      method: "get",
      handler: productsProxy,
    },
  ],
  plugins: [
    seo({
      collections: ["products"],
      generateTitle: () => {
        return "Shopaggator - the marketplace for digital assets";
      },
      uploadsCollection: "media",
    }),
  ],
});
