export const PRODUCT_CATEGORIES = [
  {
    label: "Landing Pages",
    value: "landing_pages" as const,
    featured: [
      {
        name: "Editor picks",
        href: `/products?category=landing_pages`,
        imageSrc: "/nav/designs/landing-page-1.png",
      },
      {
        name: "New Arrivals",
        href: "/products?category=landing_pages&sort=desc",
        imageSrc: "/nav/designs/landing-page-2.png",
      },
      {
        name: "Bestsellers",
        href: "/products?category=landing_pages",
        imageSrc: "/nav/designs/bestseller.webp",
      },
    ],
  },
  {
    label: "Icons",
    value: "icons" as const,
    featured: [
      {
        name: "Favorite Icon Picks",
        href: `/products?category=icons`,
        imageSrc: "/nav/icons/picks.jpg",
      },
      // {
      //   name: "New Arrivals",
      //   href: "/products?category=icons&sort=desc",
      //   imageSrc: "/nav/icons/new.jpg",
      // },
      {
        name: "Bestselling Icons",
        href: "/products?category=icons",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];
