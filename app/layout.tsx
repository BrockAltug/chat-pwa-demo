import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"


export const metadata: Metadata = {
  title: "SoftEdge - Chat PWA Demo",
  description: "A modern social chat platform combining Discord, Instagram, and Twitter features",
  generator: "ChatFlow",
  manifest: "/manifest.json",
  keywords: ["chat", "social", "discord", "instagram", "twitter", "pwa"],
  authors: [{ name: "ChatFlow Team" }],
  creator: "ChatFlow",
  publisher: "ChatFlow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://chatflow.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ChatFlow - Social Chat Platform",
    description: "A modern social chat platform combining Discord, Instagram, and Twitter features",
    url: "https://chatflow.app",
    siteName: "ChatFlow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatFlow - Social Chat Platform",
    description: "A modern social chat platform combining Discord, Instagram, and Twitter features",
    creator: "@chatflow",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4DB6AC" },
    { media: "(prefers-color-scheme: dark)", color: "#80CBC4" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ChatFlow",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
