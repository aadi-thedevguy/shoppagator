import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload";
import {
    addUser,
    createStripeProduct,
    deleteProductFiles,
    syncUser,
    syncUserAfterDelete,
} from "./hooks";
import { isAdminOrHasAccessToImages } from "@/access/hasImageAccess";
import { isAdmin } from "@/access/isAdmin";
import { isAdminOrHasAccess } from "@/access/isAdminOrHasAccess";

export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {
        read: isAdminOrHasAccessToImages(),
        create: isAdmin,
        // update: isAdmin,
        // delete: isAdmin,
        update: isAdminOrHasAccess(),
        delete: isAdminOrHasAccess(),
    },
    hooks: {
        afterChange: [syncUser],
        beforeChange: [addUser, createStripeProduct],
        afterDelete: [deleteProductFiles, syncUserAfterDelete],
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
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            label: "Product details",
            type: "richText",
        },
        {
            name: "price",
            label: "Price in INR",
            min: 0,
            max: 1000,
            type: "number",
            required: true,
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
            required: true,
        },
        {
            name: "product_files",
            label: "Product file(s) (can be images, .pdf, .csv and .zip)",
            admin: {
                description:
                    "If you are uploading multiple files, it is better to compress them to .zip and upload instead of individually uploading files one by one",
            },
            type: "relationship",
            required: true,
            relationTo: "product_files",
            hasMany: true,
        },
        {
            name: "approvedForSale",
            label: "Product Status",
            type: "select",
            defaultValue: "pending",
            access: {
                create: ({ req }) => req?.user?.role === "admin",
                read: ({ req }) => req?.user?.role === "admin",
                update: ({ req }) => req?.user?.role === "admin",
            },
            options: [
                {
                    label: "Pending verification",
                    value: "pending",
                },
                {
                    label: "Approved",
                    value: "approved",
                },
                {
                    label: "Denied",
                    value: "denied",
                },
            ],
        },
        {
            name: "priceId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        {
            name: "stripeId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        {
            name: "images",
            type: "array",
            label: "Product images",
            minRows: 1,
            maxRows: 4,
            required: true,
            labels: {
                singular: "Image",
                plural: "Images",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
    ],
};
