import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Poppins, Inter, Cairo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "./_components/footer/Footer";
import { NavigationMenuDemo } from "./_components/navbar/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Dentify",
  description:
    "The digital bridge connecting dental students with clinical cases, empowering practice and serving the community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={cn(
        "antialiased",
        poppins.variable,
        inter.variable,
        cairo.variable,
        "font-sans",
      )}
    >
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
