import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { AppProviders } from "./providers"; // ✅ add this

const PoppinsFont = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
    title: "EventPOM",
    description: "EventPOM is a platform for managing events",
    viewport: "width=device-width, initial-scale=1",
    keywords: ["EventPOM", "events", "management"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${PoppinsFont.className} antialiased`}>
        <SessionProvider>
          <AppProviders>
            <Navbar />
            <Toaster />
            {children}
          </AppProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
