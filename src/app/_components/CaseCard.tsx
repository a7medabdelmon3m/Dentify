"use client";
import Image from "next/image";
import React from "react";
import { FaCalendarAlt, FaEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdLocalPhone } from "react-icons/md";
import Xray from "@/assets/images/dental-x-rays.png";
import { Button } from "@/components/ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTranslations } from "next-intl";

export default function CaseCard() {
  // بننادي على المسار المظبوط من الـ JSON بتاعك
  const t = useTranslations("cases.CaseCard");
  const g = useTranslations("governorates");

  return (
    <div className="bg-gray-50 shadow-sm space-y-3 rounded-lg p-3 hover:shadow-md transition-all">
      <div className="flex gap-4 justify-between items-start">
        <div className="">
          {/* اسم المريض داتا تترك كما هي */}
          <h4 className="font-heading text-lg font-medium text-text-title">
            Ali Mohammed
          </h4>
          <div className="flex flex-wrap gap-3 items-center text-text-muted font-medium text-sm">
            <p className="flex gap-1 items-center">
              <MdLocalPhone /> 012xxxxxxxx
            </p>
            <p className="flex gap-1 items-center">
              <FaLocationDot /> {g("beni_suef")}
            </p>
            <p className="flex gap-1 items-center">
              <FaCalendarAlt /> {t("timeAgo")}
            </p>
          </div>
        </div>

        <div className="bg-success text-white font-semibold text-sm rounded-sm flex justify-center items-center shrink-0 py-1 px-3">
          {t("statusMatched")}
        </div>
      </div>

      <div className="flex items-end flex-col sm:flex-row justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-24 h-24 overflow-hidden rounded-lg shrink-0">
            <Image fill className="object-cover" src={Xray} alt="x-ray" />
          </div>
          <div className="space-y-2">
            <h5 className="text-text-title font-semibold leading-7">
              Diabetes Mellitus
            </h5>
            <p className="text-text-body text-lg line-clamp-2 ">
              A chronic condition that affects how your body turns food into energy
              A chronic condition that affects how your body turns food into energy
              A chronic condition that affects how your body turns food into energy
              A chronic condition that affects how your body turns food into energy
              A chronic condition that affects how your body turns food into energy
            </p>
          </div>
        </div>

        <div className="flex w-full sm:w-auto justify-center gap-3 rounded-lg border border-gray-100 bg-gray-100 p-2 ">
          <Button 
            title={t("deleteTitle")}
            className="h-auto bg-red-100 text-danger border-danger rounded-md p-2 hover:bg-danger hover:text-white transition-colors cursor-pointer"
          >
            <RiDeleteBin6Line />
          </Button>
          <Button 
            title={t("editTitle")}
            className="h-auto bg-green-100 text-success border-success rounded-md p-2 hover:bg-success hover:text-white transition-colors cursor-pointer"
          >
            <FaEdit />
          </Button>
        </div>
      </div>
    </div>
  );
}