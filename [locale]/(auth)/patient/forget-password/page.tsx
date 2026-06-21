'use client'
import React, { useState } from "react";
import ForgetForm from "../../../../_components/ForgetForm";
import forget from '@/assets/images/forget-password.jpg'
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
// import { zodResolver } from "@hookform/resolvers/zod";

 export type forgetPasswordType = {
    email:string
  }
export default function Page() {
  const t = useTranslations('auth');
  const [isSent, setIsSent] = useState(false);
  

  return (
    <div>
      <section className="my-12">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex justify-center lg:justify-between py-15 gap-15 border-b border-[#0000001A]">
            <div className="space-y-8">
              <div className="space-y-4 text-text-black text-center lg:text-start">
                <h2 className="font-bold text-3xl md:text-[40px] leading-12 font-heading">
                  {t('forgot_password.title')}
                </h2>
                {!isSent && <p>{t('forgot_password.subtitle')}</p> }
                
              </div>
                <ForgetForm onSentSuccess={() => setIsSent(true)}/>
            </div>
            <div className="relative hidden lg:block w-139 h-111 overflow-hidden">
                <Image fill  className="object-cover" src={forget} alt="forget password Image"></Image>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
