import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Rejuvonix | Personalized Weight Care", description: "Explore personalized GLP-1 treatment options and connect with an independent licensed healthcare provider through Rejuvonix.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
