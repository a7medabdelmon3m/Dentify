import type { Metadata } from "next";
import { Poppins, Inter, Cairo } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  variable: "--font-poppins",
  display: 'swap', 
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700"], 
  variable: "--font-cairo",
  display: 'swap',
});
export const metadata: Metadata = {
  title: "Dentify",
  description:
    "The digital bridge connecting dental students with clinical cases, empowering practice and serving the community",
};

export default async  function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
   params: Promise<{locale: string}>;
}>) {
   const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const fontClassName = locale === 'ar' ? cairo.variable : `${poppins.variable} ${inter.variable}`;
  return (
    <html
    suppressHydrationWarning={true}
      lang={locale}
      dir={locale === 'en'? 'ltr' : 'rtl'}
      className={cn("antialiased", fontClassName)}
    >
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider>
        <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
