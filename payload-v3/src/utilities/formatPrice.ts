
export function formatPrice(
    price: number | string,
    options: {
        currency?: "USD" | "EUR" | "INR" | "BDT";
        notation?: Intl.NumberFormatOptions["notation"];
    } = {}
) {
    const { currency = "INR", notation = "compact" } = options;

    const numericPrice = typeof price === "string" ? parseFloat(price) : price;

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        notation,
        maximumFractionDigits: 2,
    }).format(numericPrice);
}