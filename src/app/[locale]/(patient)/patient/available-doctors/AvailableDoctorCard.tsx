"use client";
import Image from "next/image";
import React from "react";
import doctor from "@/assets/images/Dr. Ahmed.png";
import { MdLocationPin } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { availableDoctorsType } from "@/type";

export default function AvailableDoctorCard({doctor:d}:{doctor:availableDoctorsType}) {
  // نداء ترجمة نصوص الكارد
  const t = useTranslations("available-doctors.AvailableDoctorCard");
  // نداء ترجمة المحافظات مباشرة من الأوبجكت اللي عندك
  const g = useTranslations("governorates");

  // هفترض إن الداتا دي هي اللي هتبقى Props للكومبوننت
  const doctorData = {
    name: "Ali Mohamed",
    cityKey: "cairo" // الـ key ده هو اللي هيتترجم لـ "القاهرة" أو "Cairo"
  };

  return (
    <Link href={`/patient/available-doctors/${d.id}`} className="bg-white rounded-xl px-3 py-5 space-y-3 shadow-sm hover:shadow-md transition-all">
      <div className="relative w-16 h-16 mx-auto">
        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2 ">
          <Image
            fill
            className="object-cover"
            src={d.profileImageUrl? d.profileImageUrl: doctor}
            alt="doctor"
          ></Image>
        </div>
        <div className="w-3 h-3 rounded-full bg-success absolute ring-1 ring-white ring-offset-1 bottom-0 right-0"></div>
      </div>
      
      <div className="space-y-1">
        <h4 className="font-heading font-medium text-text-title text-center ">
          {d.fullName}
        </h4>
        
        <p className="text-text-muted text-sm font-medium flex gap-2 justify-center items-center ">
          <MdLocationPin />
          {/* استدعاء المحافظة المترجمة فوراً باستخدام الـ key */}
          {g(d.city)}
        </p>
      </div>

      <Button className="w-full h-auto bg-primary hover:bg-primary-hover px-4 py-1 rounded-xl font-semibold text-white ">
        {t("requestButton")}
      </Button>
    </Link>
  );
}