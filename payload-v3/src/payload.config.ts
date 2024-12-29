import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { ProductFiles } from './collections/Products/ProductFile'
import { Orders } from './collections/Orders'
import { Reviews } from './collections/Reviews'
import { Users } from './collections/Users'
import { Policy } from './collections/Globals/Policy'
import { plugins } from './plugins'
import { getServerSideURL } from './utilities/getURL'
import { defaultEditorConfig } from './utilities/editor.config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  email: nodemailerAdapter({
    defaultFromAddress: 'support@thedevguy.in',
    defaultFromName: 'No Reply',
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      // beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      // beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  upload: {
    abortOnLimit: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB in bytes
    }
  },

  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultEditorConfig,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Media, Categories, Users, Products, ProductFiles, Orders, Reviews],
  cors: ["https://checkout.stripe.com", getServerSideURL()].filter(Boolean),
  csrf: [
    "https://checkout.stripe.com",
    getServerSideURL(),
  ].filter(Boolean),
  globals: [Policy],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
    s3Storage({
      collections: {
        media: true,
        product_files: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION,
        // ... Other S3 configuration
      },
    }),
  ],
  sharp,
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
