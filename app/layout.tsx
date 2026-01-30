import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hafiz Nazwa Nugraha | Software Engineer",
  description: "Software Engineer and Mobile & Web Developer specializing in Nuxt.js, Flutter, and Modern Web Technologies. Based in Banjarmasin, Indonesia.",
  keywords: "software engineer, mobile developer, web developer, Flutter, Nuxt.js, WordPress, Hafiz Nazwa Nugraha",
  authors: [{ name: "Hafiz Nazwa Nugraha" }],
  openGraph: {
    title: "Hafiz Nazwa Nugraha | Software Engineer",
    description: "Software Engineer and Mobile & Web Developer specializing in Nuxt.js, Flutter, and Modern Web Technologies",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
