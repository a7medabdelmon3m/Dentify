"use client"
import Image from "next/image";
import React from "react";
import login from "../../../../assets/images/patient_login.jpg";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LoginForm from "./LoginForm";
export default function page() {
  return (
    <section className="py-12">
      <div className="container px-16 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-10 w-full">
          <div className="hidden lg:block relative w-full md:w-133.75 aspect-535/564 shrink-0  overflow-hidden rounded-[102px] ">
            <Image
              fill
              src={login}
              alt="login patient"
              className="object-cover"
            ></Image>
          </div>
          <div className="min-w-100">
            <LoginForm/>
          </div>
        </div>
      </div>
    </section>
  );
}
