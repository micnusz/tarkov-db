import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/query-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/next";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: "400",
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
      <body className={`${robotoMono.className} antialiased`}>
        <QueryProvider>
          <Header />
          {children}
          <Analytics />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
