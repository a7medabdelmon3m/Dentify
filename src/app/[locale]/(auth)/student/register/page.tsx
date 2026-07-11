"use client";
import React from "react";
import RegisterForm from "./RegisterForm";
import Image from "next/image";
import register from '@/assets/images/sign-up.webp'

export default function RegisterPage() {
  return (
    <section className="min-h-screen flex items-center py-12 bg-slate-50">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-12 max-w-7xl mx-auto">
          <div className="w-full lg:w-[45%] flex flex-col justify-center items-start relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-700 font-bold text-sm border border-blue-600/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              تسجيل الأطباء الجدد
            </div>
            <RegisterForm />
          </div>

          <div className="hidden lg:flex relative w-full lg:w-[55%] h-[800px] rounded-[40px] bg-gradient-to-bl from-blue-600/15 via-blue-600/5 to-white items-center justify-center p-8 group">
            <Image
              src={register}
              alt="Register Illustration"
              className="w-full max-w-lg h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
