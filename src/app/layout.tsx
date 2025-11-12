import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js ハンズオン学習",
  description: "Next.jsについて手を動かしながら学べる学習サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
