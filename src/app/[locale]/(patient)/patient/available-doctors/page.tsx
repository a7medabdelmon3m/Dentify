"use client";
import { egyptGovernorates } from "@/app/constants/locations";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { FaFilter } from "react-icons/fa";
import AvailableDoctorCard from "./AvailableDoctorCard";
import PageHeader from "@/app/_components/PageHeader";
import { useTranslations } from "next-intl";

export default function AvailableDoctorsPage() {
  const t = useTranslations("available-doctors.AvailableDoctorsPage");
  const g = useTranslations("governorates");

  return (
    <section className="flex-1 bg-[#F3F4FF]">
      <div className="container mx-auto p-4 space-y-4 min-h-screen">
        <PageHeader title={t("title")} desc={t("desc")} />

        <div className="bg-white rounded-lg flex gap-3 items-center w-fit px-3 py-1">
          <div className="w-10 h-10 rounded-lg flex justify-center items-center bg-blue-100 text-blue-500 text-xl">
            <FaFilter />
          </div>
          <div className="flex gap-6 items-center">
            <div>
              <p className="text-md font-medium text-text-body">
                {t("filterLabel")}
              </p>

              <Select defaultValue="All">
                <SelectTrigger className="w-full max-w-48 ring-0 border-none border-b pt-1! focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-0 bg-gray-50 cursor-pointer ">
                  <SelectValue placeholder={t("selectPlaceholder")} />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="bg-white ring-0 focus-visible:outline-0"
                >
                  <SelectGroup className="text-text-muted text-xs leading-4.5">
                    {/* خيار الكل - ده ثابت في الكومبوننت */}
                    <SelectItem value="All">{t("all")}</SelectItem>

                    {/* المحافظات - بنلف على الـ constants ونترجم بالـ label */}
                    {egyptGovernorates.map((univer) => (
                      <SelectItem
                        key={univer.label} // ده الكي بتاع الرياكت
                        value={univer.label} // دي القيمة اللي هتروح للباك إند (مثلاً "cairo")
                      >
                        {/* هنا السحر: الـ g هتاخد كلمة "cairo" من الـ constants 
       وتروح تدور عليها في ملف الـ JSON وتطلع "القاهرة"
    */}
                        {g(univer.label)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {/* هنا هتعمل Loop على الداتا اللي جاية من الـ API لاحقاً */}
          {Array.from({ length: 13 }).map((_, idx) => (
            <AvailableDoctorCard key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
