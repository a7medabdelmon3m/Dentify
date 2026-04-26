"use client";
import Image from "next/image";
import React from "react";
import me from "@/assets/images/patient.jpg";
import { FaLocationDot, FaLocationPin } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ProposalCard() {
  // تم التغيير لـ proposal
  const t = useTranslations("proposal");
  // استدعاء المحافظات عشان تترجم "Beni-suef"
  const g = useTranslations("governorates");

  // داتا افتراضية (هتيجي من الـ API بعدين)
  const proposalData = {
    studentName: "ahmed moneim",
    cityKey: "beni_suef"
  };

  return (
    <Link
      href={`/patient/proposals/123456`}
      className="rounded-xl bg-white p-6 space-y-6 shadow-md"
    >
      <div className="relative w-fit mx-auto">
        <div className="w-22 h-22 rounded-full relative overflow-hidden  ring-2 ring-primary ring-offset-2">
          <Image
            fill
            className="object-cover"
            src={me}
            alt="user photo"
          ></Image>
        </div>
          <div className="absolute w-4 h-4 rounded-full bg-success bottom-0 right-0 z-10"></div>
      </div>

      <div className="space-y-2">
        {/* اسم الطالب كداتا */}
        <h3 className="text-text-black font-bold font-heading text-center">
          {proposalData.studentName}
        </h3>
        <div className="flex items-center gap-2 mx-auto text-gray-500 justify-center text-sm font-semibold">
          <FaLocationDot />
          {/* استخدام أوبجكت المحافظات لترجمة المدينة */}
          {g(proposalData.cityKey)}
        </div>
      </div>
      <div className="flex sm:flex-col gap-2 items-center justify-center">
        <Button className="h-auto rounded-xl  text-white py-2 w-full hover:bg-primary-hover transition-colors duration-100">
          {t(`actions.view_details`)}
        </Button>
      </div>
    </Link>
  );
}