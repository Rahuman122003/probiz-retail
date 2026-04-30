import "./globals.css";
import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ProBiz Retail — AI-Powered GST Billing, Accounting & Inventory",
  description: "Run your entire business with AI. GST billing, inventory, accounting — unified in one cinematic platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}