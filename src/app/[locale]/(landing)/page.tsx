import React from "react";
import Image from "next/image";
import landing from "@/assets/images/c79ae36aa0817a7fd03ffa8fd995bf58cdd3ec8c.jpg";
import { Button } from "@/components/ui/button";
import { PiToothLight } from "react-icons/pi";
import patient from "@/assets/images/patient.jpg";
import student from "@/assets/images/student.jpg";
import Link from "next/link";
import { FaArrowLeftLong, FaArrowRightLong, FaLocationDot } from "react-icons/fa6";
import { SlGraduation } from "react-icons/sl";
import { FaPhone, FaUser } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IoMdMail } from "react-icons/io";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export default async function Home({params}:{params:Promise<{locale: string}>}) {
const {locale} = await params ; 
   const t = await getTranslations();
  return (
    <div>
      
      <div className="relative w-full h-screen overflow-hidden">
        <Image
          fill
          src={landing}
          alt="about landing"
          className="object-cover"
          priority 
        />

        <div className="absolute inset-0 z-5 flex flex-col justify-center items-center text-center text-text-title px-4 bg-black/10">
          <h1 className="font-heading text-4xl md:text-7xl font-bold leading-tight">
            {/* Welcome to <br /> Dentify */}
            {t(`hero.title`)}
          </h1>

          <p className="font-semibold text-xl md:text-4xl mt-6 md:mt-10">
            {/* select your role to continue */}
            {t(`hero.subtitle`)}
          </p>

          
          <div className="flex flex-wrap gap-4 justify-center mt-10 md:mt-16">
            <Link href={'/student/login'} className="py-2 px-6 md:px-8 rounded-full bg-primary text-white text-2xl md:text-4xl font-normal h-auto hover:bg-primary-hover transition-all">
              {/* Student */}
              {t(`hero.buttons.student`)}
            </Link>
            <Link href={'/patient/login'} className="py-2 px-6 md:px-8 rounded-full bg-primary text-white text-2xl md:text-4xl font-normal h-auto hover:bg-primary-hover transition-all">
              {/* Patient */}
              {t(`hero.buttons.patient`)}
            </Link>
          </div>
        </div>
      </div>
      <section>
        <div className="container py-25 px-4 mx-auto">
          <div>
            <div className="text-center">
              <p className="text-[#3011DB] text-3xl md:text-[40px] font-light">
               {t(`about.badge`)}
              </p>
              <h2 className="font-heading font-bold text-text-title text-5xl md:text-[64px]">
                {t(`about.title`)}
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-11 mt-25 ">
              <div className="p-2.5 flex gap-2.5 col-span-4 md:col-span-1 justify-center">
                <div className="space-y-5">
                  <div className="p-1.25 flex gap-1  text-text-body text-4xl font-normal ">
                    <PiToothLight />
                    {t(`about.patient.role`)}
                  </div>
                  <div className="relative h-45 w-45 rounded-full overflow-hidden">
                    <Image
                      fill
                      src={patient}
                      alt="Patient"
                      className="object-cover"
                    ></Image>
                  </div>
                </div>
              </div>
              <div className="col-span-4 md:col-span-3 space-y-11">
                <p className="font-light text-4xl text-text-black">
                  {t(`about.patient.description`)}
                </p>
                <Link
                  href={"/about"}
                  className="flex gap-3.5 bg-primary-subtle text-[#1877F2] text-4xl font-light  w-fit mx-auto"
                >
                  {t(`about.patient.link`)}{locale === 'en' ? <FaArrowRightLong /> : <FaArrowLeftLong /> } 
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-11 mt-25">
              <div className="p-2.5 flex gap-2.5 col-span-4 md:col-span-1 justify-center">
                <div className="space-y-5">
                  <div className="p-1.25 flex gap-1  text-text-body text-4xl font-normal ">
                    <SlGraduation />
                    {t(`about.student.role`)}
                  </div>
                  <div className="relative h-45 w-45 rounded-full overflow-hidden">
                    <Image
                      fill
                      src={student}
                      alt="student"
                      className="object-cover"
                    ></Image>
                  </div>
                </div>
              </div>
              <div className="col-span-4 md:col-span-3 space-y-11">
                <p className=" font-light text-4xl text-text-black">
                 {t(`about.student.description`)}
                </p>
                <Link
                  href={"/about"}
                  className="flex gap-3.5 bg-primary-subtle text-[#1877F2] text-4xl font-light  w-fit mx-auto"
                >
                  {t(`about.student.link`)} {locale === 'en' ? <FaArrowRightLong /> : <FaArrowLeftLong /> }
                </Link>
              </div>
            </div>
          </div>

          <div id="contact" className="pt-20 mt-20 border-t border-gray-100">
            <div className="text-center">
              <p className="text-[#3011DB] text-3xl md:text-[40px] font-light">
                {t(`contact.badge`)}
              </p>
              <h2 className="font-heading font-bold text-text-title text-5xl md:text-[64px]">
                {t(`contact.title`)}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-25">
              <div className="space-y-8">
                <div className="flex gap-5 items-center">
                  <div className="flex shrink-0 justify-center items-center h-17.5 w-17.5 rounded-full text-text-black bg-[#1877F2CC] text-[28px]">
                    <FaPhone />
                  </div>
                  <span className="text-text-black font-semibold text-4xl">
                    {t(`contact.info.phone`)}
                  </span>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="flex shrink-0 justify-center items-center h-17.5 w-17.5 rounded-full text-text-black bg-[#1877F2CC] text-[28px]">
                    <SiGmail />
                  </div>
                  <span className="text-text-black break-all font-semibold text-4xl ">
                    {t(`contact.info.email`)}
                  </span>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="flex shrink-0 justify-center items-center h-17.5 w-17.5 rounded-full text-text-black bg-[#1877F2CC] text-[28px]">
                    <FaLocationDot />
                  </div>
                  <span className="text-text-black font-semibold text-4xl">
                    {t(`contact.info.location`)}
                  </span>
                </div>
              </div>
              <form className="px-6 space-y-8" action="">
                <div className="flex flex-col xl:flex-row gap-6">
                  <div className="relative w-full text-text-body">
                    <Input
                      className="rounded-full border border-[#1F2A44] bg-[#D9D9D9] py-4 ps-14 pe-4 h-auto  text-xl! focus:border-none  focus:ring-1 focus:ring-primary focus:ring-offset-2"
                      placeholder={t(`contact.form.name_placeholder`)}
                    ></Input>
                    <FaUser className="absolute top-1/2 left-4 text-2xl -translate-y-1/2" />
                  </div>
                  <div className="relative w-full text-text-body">
                    <Input
                      type="email"
                      className="rounded-full border border-[#1F2A44] bg-[#D9D9D9] py-4 ps-14 pe-4 h-auto  text-xl! focus:border-none  focus:ring-1 focus:ring-primary focus:ring-offset-2"
                      placeholder={t(`contact.form.email_placeholder`)}
                    ></Input>
                    <IoMdMail className="absolute top-1/2 left-4 text-2xl -translate-y-1/2" />
                  </div>
                </div>
                <div className="w-full ">
                  <Textarea
                    className="rounded-[20px] min-h-40  border border-[#1F2A44] bg-[#D9D9D9] p-4 h-auto  text-xl! focus:border-none  focus:ring-1 focus:ring-primary focus:ring-offset-2"
                    placeholder={t(`contact.form.message_placeholder`)}
                  ></Textarea>
                </div>
                <Button
                  type="button"
                  className="rounded-[100px] text-white border border-[#1F2A44] w-full  text-2xl font-bold bg-primary hover:bg-primary-hover transition-colors duration-100 cursor-pointer px-8 py-4 h-auto"
                >
                  {t(`contact.form.submit_btn`)}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
