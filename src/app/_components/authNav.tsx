'use client'
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import logo from '../../assets/images/logo.png'

export default function AuthNav() {
     const pathName = usePathname();
  const isStudent = pathName.includes("student");
  const isLogin = pathName.includes("login");
  const isSignUp = pathName.includes("register");
  console.log("is login : ", isLogin);

  // console.log('this is the path name :' , pathName);
  const t  = useTranslations(`auth`)
  return (
    <div>
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
              <p className="text-primary font-bold font-heading ">{t(`nav_brand`)}</p>
            </div>
            <div className="flex gap-4 items-center">
              {!isLogin && (
                <Link
                  href={`${isStudent ? "/student/login" : "/patient/login"}`}
                  className=" rounded-lg py-2 px-5 md:px-6 h-fit bg-[#D9D9D9] text-text-body font-semibold text-sm hover:bg-[#C1C1C1] transition-colors duration-100 shadow-[0_5px_10px_rgba(0,0,0,0.4)]"
                >
                  {t(`nav_btns.login`)}
                </Link>
              )}
              {!isSignUp && (
                <Link
                  href={`${isStudent ? "/student/register" : "/patient/register"}`}
                  className=" rounded-lg py-2 px-5 md:px-6 h-fit bg-[#D9D9D9] text-text-body font-semibold text-sm hover:bg-[#C1C1C1] transition-colors duration-100 shadow-[0_5px_10px_rgba(0,0,0,0.4)]"
                >
                  {t(`nav_btns.signup`)}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
