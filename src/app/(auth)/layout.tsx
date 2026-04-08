import React, { ReactNode } from "react";
import Footer from "../_components/footer/Footer";
import Image from "next/image";
import logo from "../../assets/images/logo.png";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav>
        <div className="container p-4 mx-auto">
          <div className="flex gap-6 justify-between">
            <div className="flex gap-2 items-center">
              <Link href="/" className="relative w-15 h-15 md:w-18 md:h-18">
                <Image
                  fill
                  src={logo}
                  alt="dentify logo"
                  className="object-cover"
                ></Image>
              </Link>
              <p className="text-primary font-bold font-heading ">Dentify</p>
            </div>
            <div className="flex gap-4 items-center">
              <Link href={'/'} className=" rounded-lg py-2 px-5 md:px-6 h-fit bg-[#D9D9D9] text-text-body font-semibold text-sm hover:bg-[#C1C1C1] transition-colors duration-100 shadow-[0_5px_10px_rgba(0,0,0,0.4)]">
                Login
              </Link>
              <Link href={'/'} className=" rounded-lg py-2 px-5 md:px-6 h-fit bg-[#D9D9D9] text-text-body font-semibold text-sm hover:bg-[#C1C1C1] transition-colors duration-100 shadow-[0_5px_10px_rgba(0,0,0,0.4)]">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <Footer />
    </>
  );
}
