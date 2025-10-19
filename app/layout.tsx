import ClientLayout from "@/components/common/ClientLayout";
import { AppConfig } from "@/config/app.config";
import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import Script from "next/script";
import { ToastContainer } from "react-toastify";
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
      <body className={`${poppins.className} !top-0`}><div id="google_translate_element" style={{ display: "hidden" }}></div>
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,id,my,zh-CN,hi,ta',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>

        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <ToastContainer/>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
