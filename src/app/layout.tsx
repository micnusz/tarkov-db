import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/query-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/footer";

const manrope = Manrope({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tarkov.db",
  description:
    "Tarkov.db - An open-source project focused on collecting all the key info related to the game Escape from Tarkov.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.className} antialiased `}>
        <QueryProvider>
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
