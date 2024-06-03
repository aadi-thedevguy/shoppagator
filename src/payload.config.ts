import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import seo from "@payloadcms/plugin-seo";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv";
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";
import { ProductFiles } from "./collections/Products/ProductFile";
import { Orders } from "./collections/Orders";
import { Policy } from "./collections/Globals/Policy";
import { Reviews } from "./collections/Reviews";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

function adapter(isProduct?: boolean) {
  let bucketName = "shoppagator-test";
  if (process.env.NODE_ENV === "production") {
    bucketName = isProduct ? "shoppagator-product-files" : "shoppagator-media";
  }
  return s3Adapter({
    config: {
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
      region: process.env.S3_REGION!,
    },
    bucket: bucketName,
  });
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Products, Media, ProductFiles, Orders, Reviews],
  upload: {
    limits: 10000000, // 10 MB in bytes
  },
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
      ogImage: "/thumbnail.jpeg",
    },
  },
  rateLimit: {
    max: 2000,
    trustProxy: true,
  },
  cors: [
    "https://checkout.stripe.com",
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
  ].filter(Boolean),
  csrf: [
    "https://checkout.stripe.com",
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
  ].filter(Boolean),
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  plugins: [
    seo({
      collections: ["products"],
      generateTitle: () => {
        return "Shopaggator - the marketplace for digital assets";
      },
      uploadsCollection: "media",
    }),
    cloudStorage({
      collections: {
        media: {
          adapter: adapter(),
        },
        product_files: {
          adapter: adapter(true),
        },
      },
    }),
  ],
});
