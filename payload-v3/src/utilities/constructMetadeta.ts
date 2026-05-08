import { Metadata } from "next";

export function constructMetadata({
    title = "Shoppagator - the marketplace for digital assets",
    description = "Shoppagator is an open-source marketplace for high-quality digital goods.",
    image = "/thumbnail.jpg",
    icons = "/favicon.ico",
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@Aadi__khare",
        },
        icons,
        metadataBase: new URL("https://shoppagator.adityakhare.com"),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}