import Navbar from "@/components/navbar/Navbar";
import Providers from "@/components/Providers";
import { cn, constructMetadata } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
  review,
}: {
  children: React.ReactNode;
  review: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={cn(
          "relative flex flex-col min-h-screen h-full font-sans antialiased",
          inter.className
        )}
      >
        <Providers>
          <Navbar />
          {review}
          <main className="flex-grow flex-1">{children}</main>
          <Footer />
        </Providers>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
