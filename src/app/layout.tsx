import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "highlight.js/styles/atom-one-light.css";
import { cookies } from "next/headers";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog",
  description: "JI's Blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await cookies()).get("theme")?.value ?? "light";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${
          theme === "dark" ? "dark" : ""
        }`}
      >
        <Header />
        <main className="main">
          <section>{children}</section>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
