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
  review,
  children,
}: {
  review: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className="relative flex flex-col min-h-screen">
          <Providers>
            <Navbar />
            {review}
            <div className="flex-grow flex-1">{children}</div>
            <Footer />
          </Providers>
        </main>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
