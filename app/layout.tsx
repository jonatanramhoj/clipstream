import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { SWRProvider } from "@/providers/swr-provider";

export const metadata: Metadata = {
  title: "CLV",
  description: "Clip Vault",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
