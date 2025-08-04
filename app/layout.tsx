import { AppConfig } from "@/config/app.config";
import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
 
// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
export const metadata: Metadata = {
  title: AppConfig().app.name,
  description: AppConfig().app.slogan,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
