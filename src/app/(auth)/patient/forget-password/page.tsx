
import { Input } from "@/components/ui/input";
import React from "react";
import { Controller } from "react-hook-form";
import ForgetForm from "../../../_components/ForgetForm";
import forget from '../../../../assets/images/forget-password.jpg'
import Image from "next/image";
export default function page() {
  return (
    <div>
      <section className="my-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex justify-center lg:justify-between py-15 gap-15 border-b border-[#0000001A]">
            <div className="space-y-15">
              <div className="space-y-6 text-text-black">
                <h2 className="font-bold text-3xl md:text-[40px] leading-12 font-heading">
                  Forgot Password
                </h2>
                <p>Enter your email address to reset your password</p>
              </div>
                <ForgetForm/>
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
