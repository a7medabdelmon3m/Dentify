import type { Metadata } from "next";
import { Poppins, Inter, Cairo } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Dentify",
  description:
    "The digital bridge connecting dental students with clinical cases, empowering practice and serving the community",
};

export default  function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { locale } =  params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const fontClassName =
    locale === "ar" ? cairo.variable : `${poppins.variable} ${inter.variable}`;
  return (
    <html
      suppressHydrationWarning={true}
      lang={locale}
      dir={locale === "en" ? "ltr" : "rtl"}
      className={cn("antialiased", fontClassName)}
    >
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider>
          <main>{children}</main>
        </NextIntlClientProvider>
        <Button className="text-white bg-red-700 py-2 px-5 h-auto sticky bottom-4 right-4 -translate-x-20 shadow-sm shadow-red-600  z-100 animate-bounce">
          <Link
            href={`/patient/dashboard`}
            className=""
          >
            شوف صفحات المريض
          </Link>
        </Button>
      </body>
    </html>
  );
}
