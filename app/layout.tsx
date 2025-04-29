import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
const Poppinsfont = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "EventPOM",
  description: "EventPOM is a platform for managing events",
  viewport: "width=device-width, initial-scale=1",
  keywords: ["EventPOM", "events", "management"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Poppinsfont} antialiased`}>
        <SessionProvider>
          <Navbar />
          {children}
          <Toaster position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
