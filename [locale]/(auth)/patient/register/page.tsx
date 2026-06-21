"use client"
import Image from "next/image";
import React from "react";
import register from "@/assets/images/Modern Clinical Setting.png";
import RegisterForm from "./RegisterForm";
export default function page() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-16 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-10 max-w-7xl mx-auto">
          <div className="hidden lg:block relative w-full md:w-133.75 aspect-535/564 shrink-0  overflow-hidden rounded-4xl ">
            <Image
              fill
              src={register}
              alt="login patient"
              className="object-cover"
            ></Image>
          </div>
          <div className="md:min-w-100 w-full  lg:max-w-100">
            <RegisterForm/>
          </div>
        </div>
      </div>
    </section>
  );
}
