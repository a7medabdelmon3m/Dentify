import React from "react";
import Image from "next/image";
import landing from "@/assets/images/c79ae36aa0817a7fd03ffa8fd995bf58cdd3ec8c.jpg";
import { Button } from "@/components/ui/button";
import { PiToothLight } from "react-icons/pi";
import patient from "@/assets/images/patient.jpg";
import student from "@/assets/images/student.jpg";
import Link from "next/link";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaLocationDot,
} from "react-icons/fa6";
import { SlGraduation } from "react-icons/sl";
import { FaPhone, FaUser } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IoMdMail } from "react-icons/io";
import { getTranslations } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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
            {t(`hero.title`)}
          </h1>

          <p className="font-semibold text-xl md:text-4xl mt-6 md:mt-10">
            {t(`hero.subtitle`)}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-10 md:mt-16">
            <Link
              href={"/student/login"}
              className="py-2 px-6 md:px-8 rounded-full bg-primary text-white text-2xl md:text-4xl font-normal h-auto hover:bg-primary-hover transition-all"
            >
              {t(`hero.buttons.student`)}
            </Link>
            <Link
              href={"/patient/login"}
              className="py-2 px-6 md:px-8 rounded-full bg-primary text-white text-2xl md:text-4xl font-normal h-auto hover:bg-primary-hover transition-all"
            >
              {t(`hero.buttons.patient`)}
            </Link>
          </div>
        </div>
      </div>
      <section>
        <div className="container py-16 px-4 mx-auto">
          <div className="space-y-16">
            <div className="text-center space-y-2">
              <p className="text-[#3011DB] text-lg md:text-xl font-medium tracking-wide uppercase">
                {t(`about.badge`)}
              </p>
              <h2 className="font-heading font-bold text-text-title text-3xl md:text-5xl leading-tight">
                {t(`about.title`)}
              </h2>
            </div>

            <div className="max-w-5xl mx-auto space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                <div className="flex flex-col items-center space-y-4 col-span-1">
                  <div className="flex items-center gap-2 text-text-body text-xl font-semibold">
                    <PiToothLight className="text-2xl text-primary" />
                    {t(`about.patient.role`)}
                  </div>
                  <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-primary-subtle shadow-md">
                    <Image
                      fill
                      src={patient}
                      alt="Patient"
                      className="object-cover"
                      // ضيف السطر ده
                      sizes="128px"
                    />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-3 space-y-6 text-center md:text-start">
                  <p className="font-light text-lg md:text-xl text-text-black leading-relaxed">
                    {t(`about.patient.description`)}
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
                  >
                    {t(`about.patient.link`)}
                    {locale === "en" ? (
                      <FaArrowRightLong />
                    ) : (
                      <FaArrowLeftLong />
                    )}
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                <div className="flex flex-col items-center space-y-4 col-span-1">
                  <div className="flex items-center gap-2 text-text-body text-xl font-semibold">
                    <SlGraduation className="text-2xl text-primary" />
                    {t(`about.student.role`)}
                  </div>
                  <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-primary-subtle shadow-md">
                    <Image
                      fill
                      src={student}
                      alt="Student"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-3 space-y-6 text-center md:text-start">
                  <p className="font-light text-lg md:text-xl text-text-black leading-relaxed">
                    {t(`about.student.description`)}
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
                  >
                    {t(`about.student.link`)}
                    {locale === "en" ? (
                      <FaArrowRightLong />
                    ) : (
                      <FaArrowLeftLong />
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div id="contact" className="pt-20 mt-24 border-t border-gray-100">
            <div className="text-center space-y-2 mb-16">
              <p className="text-[#3011DB] text-lg md:text-xl font-medium uppercase">
                {t(`contact.badge`)}
              </p>
              <h2 className="font-heading font-bold text-text-title text-3xl md:text-5xl">
                {t(`contact.title`)}
              </h2>
            </div>

            <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
              <div className="lg:col-span-2 space-y-6">
                {[
                  { icon: <FaPhone />, text: t(`contact.info.phone`) },
                  { icon: <SiGmail />, text: t(`contact.info.email`) },
                  { icon: <FaLocationDot />, text: t(`contact.info.location`) },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex shrink-0 justify-center items-center h-12 w-12 rounded-full text-white bg-primary shadow-sm text-xl">
                      {item.icon}
                    </div>
                    <span className="text-text-black font-medium text-lg break-all">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <form className="lg:col-span-3 bg-gray-50 p-8 rounded-3xl space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Input
                      className="rounded-xl border-gray-200 bg-white py-6 ps-12 h-auto text-base focus:ring-2 focus:ring-primary transition-all"
                      placeholder={t(`contact.form.name_placeholder`)}
                    />
                    <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="relative">
                    <Input
                      type="email"
                      className="rounded-xl border-gray-200 bg-white py-6 ps-12 h-auto text-base focus:ring-2 focus:ring-primary transition-all"
                      placeholder={t(`contact.form.email_placeholder`)}
                    />
                    <IoMdMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <Textarea
                  className="rounded-xl min-h-37.5 border-gray-200 bg-white p-4 text-base focus:ring-2 focus:ring-primary transition-all"
                  placeholder={t(`contact.form.message_placeholder`)}
                />
                <Button
                  type="button"
                  className="rounded-xl text-white w-full text-lg font-bold bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 py-6 h-auto transition-all transform hover:-translate-y-1"
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
