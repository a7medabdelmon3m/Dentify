"use client"
import React from "react";
import LoginForm from "./LoginForm";
import login from '@/assets/images/login.webp'
import Image from "next/image";

export default function LoginPage() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center py-12 bg-slate-50">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 max-w-7xl mx-auto">
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm border border-primary/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              بوابة المرضى
            </div>
            <LoginForm />
          </div>

          <div className="hidden lg:flex relative w-full lg:w-1/2 h-[650px] rounded-[40px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent items-center justify-center p-8 group">
            
           <Image
            src={login}        
            alt="Login Illustration"
            className="w-full max-w-md h-auto object-contain drop-shadow-xl group-hover:-translate-y-4 transition-transform duration-500 ease-in-out"/>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}