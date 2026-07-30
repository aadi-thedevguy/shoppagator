import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: () => false,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "label"
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      maxLength: 30,
      required: true,
    },
    {
      name: 'slug',
      label: 'Category Slug',
      type: 'text',
      required: true,
      index: true,
      unique: true,
      validate: (value) => (typeof value === "string" && !value.includes(" ")) || 'This field is required'
    },
    {
      name: 'featured',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ]
    }
  ],
}
