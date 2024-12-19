import type {
  CollectionAfterDeleteHook,
  CollectionAfterChangeHook,
  CollectionBeforeChangeHook,
  CollectionBeforeDeleteHook,
} from "payload";
import type { Product } from "@/payload-types";
import { stripe } from "@/server/stripe";

export const syncProduct: CollectionBeforeDeleteHook = async ({ req, id }) => {
  try {
    const { docs } = await req.payload.find({
      collection: "products",
      where: {
        product_files: {
          contains: id,
        },
      },
    });

    if (docs.length <= 0) return;
    const { product_files, id: product_id } = docs[0];

    const allIDs = [
      ...(product_files?.map((product) =>
        typeof product === "object" ? product.id : product
      ) || []),
    ];

    const filteredProductFiles = allIDs.filter(
      (productFileId) => productFileId !== id
    );

    await req.payload.update({
      collection: "products",
      id: product_id,
      data: {
        product_files: filteredProductFiles,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const createStripeProduct: CollectionBeforeChangeHook<Product> = async (
  args
) => {
  if (args.operation === "create") {
    const data = args.data as Product;

    const createdProduct = await stripe.products.create({
      name: data.name,
      default_price_data: {
        currency: "INR",
        unit_amount: Math.round(data.price * 100),
      },
    });

    const updated: Product = {
      ...data,
      stripeId: createdProduct.id,
      priceId: createdProduct.default_price as string,
    };

    return updated;
  } else if (args.operation === "update") {
    const data = args.data as Product;

    const updatedProduct = await stripe.products.update(data.stripeId!, {
      name: data.name,
      default_price: data.priceId!,
    });

    const updated: Product = {
      ...data,
      stripeId: updatedProduct.id,
      priceId: updatedProduct.default_price as string,
    };

    return updated;
  }
};

export const addUser: CollectionBeforeChangeHook<Product> = async ({
  req,
  data,
}) => {
  const user = req.user;

  return { ...data, user: user?.id };
};

export const syncUser: CollectionAfterChangeHook<Product> = async ({
  req,
  doc,
}) => {
  const fullUser = await req.payload.findByID({
    collection: "users",
    id: req?.user?.id ?? "",
  });

  if (fullUser && typeof fullUser === "object") {
    const { products } = fullUser;

    const allIDs = [
      ...(products?.map((product) =>
        typeof product === "object" ? product.id : product
      ) || []),
    ];
    const createdProductIDs = allIDs.filter(
      (id, index) => allIDs.indexOf(id) === index
    );

    const dataToUpdate = [...createdProductIDs, doc.id];

    await req.payload.update({
      collection: "users",
      id: fullUser.id,
      data: {
        products: dataToUpdate,
      },
    });
  }
};

export const syncUserAfterDelete: CollectionAfterDeleteHook<Product> = async ({
  req,
  id,
}) => {
  const fullUser = await req.payload.findByID({
    collection: "users",
    id: req?.user?.id ?? "",
  });

  if (fullUser && typeof fullUser === "object") {
    const { products } = fullUser;

    const allIDs = [
      ...(products?.map((product) =>
        typeof product === "object" ? product.id : product
      ) || []),
    ];

    const filteredProducts = allIDs.filter((productId) => productId !== id);

    try {
      await req.payload.update({
        collection: "users",
        id: fullUser.id,
        data: {
          products: filteredProducts,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export const deleteProductFiles: CollectionAfterDeleteHook<Product> = async ({
  req,
  doc, // deleted document
}) => {
  const productFileIds = [
    ...(doc.product_files?.map((product) =>
      typeof product === "object" ? product.id : product
    ) || []),
  ];
  try {
    await req.payload.delete({
      collection: "product_files",
      where: {
        id: {
          in: productFileIds,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};
