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
import { ProductFiles } from "./collections/ProductFile";
import { Orders } from "./collections/Orders";
import { Policy } from "./collections/Globals/Policy";
import { Reviews } from "./collections/Reviews";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const adapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    region: process.env.S3_REGION!,
  },
  bucket: process.env.S3_BUCKET!,
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
          adapter,
        },
        product_files: {
          adapter,
        },
      },
    }),
  ],
});
