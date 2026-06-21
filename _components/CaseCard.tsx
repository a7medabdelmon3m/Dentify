"use client";
import Image from "next/image";
import React from "react";
import { FaCalendarAlt, FaEdit, FaStethoscope, FaUser, FaUserCircle } from "react-icons/fa"; // استيراد FaUserCircle
import { FaLocationDot, FaTooth } from "react-icons/fa6";
import { MdLocalPhone } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLocale, useTranslations } from "next-intl";
import { patientCaseType } from "@/type";
import { formatTimeAgo } from "@/lib/utils";
import { Stethoscope } from "lucide-react";

export default function CaseCard({ caseData }: { caseData: patientCaseType }) {
  const t = useTranslations("cases.CaseCard");
  const g = useTranslations("governorates"); 
  const locale = useLocale();
  
  const cleanImageUrl = (url: string) => {
    if (!url) return "/default-case.png"; 
    
    let cleaned = url.replace(/([^:]\/)\/+/g, "$1");
    if (!cleaned.startsWith("https://")) {
      cleaned = "https://" + cleaned.replace(/^https?:\/\//, "");
    }
    return cleaned;
  };

  const imgSrc = cleanImageUrl(caseData.image);

  // ستايلات الحالة الديناميكية (مقتبسة من Turn 13 و Turn 14)
  const statusStyles = {
    Confirmed: "bg-success/15 text-success",
    PendingAcceptance: "bg-warning/15 text-warning",
    Cancelled: "bg-danger/15 text-danger",
    Active: "bg-primary-subtle text-text-title",
  };

  return (
    // p-6 = 24px (أقصى مسافة متفق عليها)، rounded-2xl، shadow-md، bg-white (لإحساس Premium)
    <div id={String(caseData.id)} className="bg-white shadow-md space-y-6 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 border border-border-light">
      
      {/* رأس الكارت: اسم HCI واضح، الـ Status بألوان UX */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-3">
          {/* أيقونة المستخدم HCI لإبراز الاسم */}
          <div className="flex items-center justify-center w-10 h-10 bg-primary-subtle rounded-2xl border border-primary/10">
             <FaUser className="w-5 h-5 text-primary" />
          </div>
          <h4 className="font-heading text-xl font-bold text-text-title tracking-tight text-rightAr">
            {caseData?.patientName}
          </h4>
        </div>

        {/* الـ Badge بتاع الحالة HCI: منحني بالكامل، لون شفاف، خط بولد */}
        <div className={`text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1.5 ${statusStyles[caseData.status as keyof typeof statusStyles || "Active"]}`}>
          <Stethoscope className="w-3.5 h-3.5" />
          {t(`status.${caseData.status}`)}
        </div>
      </div>

      {/* خط فاصل بـ Spacing Guidelines p-6 */}
      <hr className="border-border-light" />

      {/* شبكة بيانات الحالة (Info Grid): HCI أقصى وضوح، gap-1.5 للتناسق */}
      {/* تم تعديل الشبكة لتشمل خانة العمر (Statick) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        
        {/* الهاتف */}
        <div className="flex items-start gap-3">
          <MdLocalPhone className="w-5 h-5 text-text-body mt-0.5" />
          <div className="space-y-0.5 text-rightAr">
            <p className="text-xs text-text-muted">{t("phoneLabel")}</p>
            <p className="text-sm font-semibold text-text-black">012xxxxxxxx</p>
          </div>
        </div>

        {/* الموقع */}
        <div className="flex items-start gap-3">
          <FaLocationDot className="w-5 h-5 text-text-body mt-0.5" />
          <div className="space-y-0.5 text-rightAr">
            <p className="text-xs text-text-muted">{t("locationLabel")}</p>
            <p className="text-sm font-semibold text-text-black">{g(caseData.city)}</p>
          </div>
        </div>

        {/* العمر (NEW - Statick HCI Vital Data) */}
        <div className="flex items-start gap-3">
          {/* أيقونة HCI معبرة عن بيانات المستخدم الحيوية */}
          <FaUserCircle className="w-5 h-5 text-text-body mt-0.5" />
          <div className="space-y-0.5 text-rightAr">
            <p className="text-xs text-text-muted">{t("ageLabel")}</p>
            <p className="text-sm font-semibold text-text-black">٢٤ عاماً</p> {/* قيمة ثابتة */}
          </div>
        </div>

        {/* تاريخ النشر - HCI: تاريخ مطلق وواضح */}
        <div className="flex items-start gap-3">
          <FaCalendarAlt className="w-5 h-5 text-text-body mt-0.5" />
          <div className="space-y-0.5 text-rightAr">
            <p className="text-xs text-text-muted">{t("dateTimeLabel")}</p>
            <p className="text-sm font-semibold text-text-black">
              {formatTimeAgo(caseData.createdAt, locale)}
            </p>
          </div>
        </div>
      </div>

      {/* تفاصيل الحالة (Image & Desc): HCI تجميع بصري، gap-1.5 */}
      <div className="flex items-start flex-col md:flex-row justify-between gap-6 bg-bg-main p-4 rounded-xl border border-border-light">
        <div className="flex flex-col sm:flex-row gap-4 items-start flex-1">
          {/* الصورة: rounded-xl، p-4، border */}
          <div className="relative w-24 h-24 overflow-hidden rounded-xl shrink-0 border border-border-light bg-white p-2 shadow-inner">
            <Image fill className="object-contain p-2" src={imgSrc} alt="x-ray" />
          </div>
          <div className="space-y-1.5 flex-1 text-rightAr">
            <div className="flex items-center gap-2">
               {/* أيقونة التخصص المطلوبة HCI (سن) */}
               <FaTooth className="w-4 h-4 text-primary" />
               <h5 className="text-text-black font-bold text-lg leading-snug tracking-tight">
                {caseData.specidRequiredSpecialization}
              </h5>
            </div>
            <p className="text-text-muted text-sm line-clamp-2 leading-relaxed">
              {caseData.description}
            </p>
          </div>
        </div>

        {/* أزرار الإجراءات (Actions): HCI وضوح تام، gap-1.5 */}
        <div className="flex w-full md:w-auto justify-center md:justify-end gap-3 rounded-xl border border-border-light bg-white p-3 md:self-end">
          <Button 
            title={t("deleteTitle")}
            // rounded-xl، py-6 (لتنسيق الارتفاع HCI)
            className="h-auto bg-danger/10 text-danger border border-danger/20 rounded-xl px-4 py-2 hover:bg-danger hover:text-white transition-colors cursor-pointer flex items-center justify-center"
          >
            <RiDeleteBin6Line className="w-5 h-5" />
          </Button>
          <Button 
            title={t("editTitle")}
            // rounded-xl، py-6 (لتنسيق الارتفاع HCI)
            className="h-auto bg-primary/10 text-primary border border-primary/20 rounded-xl px-4 py-2 hover:bg-primary hover:text-white transition-colors cursor-pointer flex items-center justify-center"
          >
            <FaEdit className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}