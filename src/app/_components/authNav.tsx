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

  const t = useTranslations(`auth`);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-light shadow-sm">
      
      {/* صغرنا ارتفاع النافبار في الموبايل (h-16) وفي الشاشات الأكبر يرجع (h-20) */}
      <div className="container px-4 md:px-8 h-16 md:h-20 mx-auto flex items-center justify-between">
        
        {/* اللوجو واسم البراند */}
        <div className="flex gap-2 md:gap-3 items-center hover:opacity-80 transition-opacity">
          {/* صغرنا حجم اللوجو للموبايل (w-8 h-8) وفي التابلت والكمبيوتر يكبر تدريجياً */}
          <Link href="/" className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14">
            <Image
              fill
              src={logo}
              alt="Dentify Logo"
              className="object-contain" 
            />
          </Link>
          {/* صغرنا حجم الخط للموبايل (text-lg) بدل xl */}
          <p className="text-primary font-bold font-heading text-lg sm:text-xl md:text-2xl tracking-tight">
            {t(`nav_brand`)}
          </p>
        </div>

        {/* الأزرار (Actions) */}
        <div className="flex gap-2 sm:gap-4 items-center">
          
          {!isLogin && (
            <Link
              href={`${isStudent ? "/student/login" : "/patient/login"}`}
              // صغرنا البادينج والخط في الموبايل (py-1.5 px-3 text-xs) عشان الزرار ميكسرش السطر
              className="rounded-lg md:rounded-xl py-1.5 px-3 md:py-2.5 md:px-6 bg-primary-subtle text-primary font-bold text-xs md:text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
            >
              {t(`nav_btns.login`)}
            </Link>
          )}

          {!isSignUp && (
            <Link
              href={`${isStudent ? "/student/register" : "/patient/register"}`}
              className="rounded-lg md:rounded-xl py-1.5 px-3 md:py-2.5 md:px-6 bg-primary text-white font-bold text-xs md:text-sm hover:bg-primary-hover transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {t(`nav_btns.signup`)}
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}