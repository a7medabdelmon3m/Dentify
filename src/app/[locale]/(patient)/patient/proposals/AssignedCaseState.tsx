import React from "react";
// استيراد الأيقونات من fa6 للحفاظ على الاتساق
import { FaCircleCheck, FaUserDoctor, FaMessage } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AssignedCaseStateProps {
  doctorName?: string; // اختياري لو عايز تعرض اسم الدكتور
  id :string
}

export default function AssignedCaseState({ doctorName ,id }: AssignedCaseStateProps) {
  const t = useTranslations("proposal.assignedState");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 text-center animate-in fade-in zoom-in-95 duration-500">
      
      {/* حاوية الأيقونة - ألوان Success بتدي راحة نفسية للمريض (Positive Feedback) */}
      <div className="flex items-center justify-center w-24 h-24 bg-success/10 border-4 border-success/20 rounded-full mb-6 shadow-sm">
        <FaCircleCheck className="w-12 h-12 text-success" />
      </div>

      {/* المحتوى النصي */}
      <div className="max-w-md space-y-3">
        <h3 className="font-heading font-bold text-2xl text-text-title tracking-tight">
          {t("title")}
        </h3>
        <p className="text-base text-text-muted font-medium leading-relaxed">
          {doctorName 
            ? t("descriptionWithDoctor", { name: doctorName }) 
            : t("description")}
        </p>
      </div>

      {/* أزرار اتخاذ الإجراء (CTAs) - مسار واضح للمستخدم */}
      <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-sm">
        
        {/* الزرار الأساسي: لوحة التحكم أو تفاصيل الحالة */}
        <Button asChild className="h-14 flex-1 rounded-xl bg-primary hover:bg-primary-hover text-white font-heading font-bold shadow-sm transition-all duration-200">
          <Link href={`/patient/dashboard#${id}`}>
            <FaUserDoctor className="ml-2 w-4 h-4" /> {/* الأيقونة على الشمال عشان العربي */}
            {t("goToDashboard")}
          </Link>
        </Button>

        {/* الزرار الثانوي: رسائل الدكتور (Outline عشان ميسرقش العين من الزرار الأساسي) */}
        <Button asChild variant="outline" className="h-14 flex-1 rounded-xl border-border-light text-text-title hover:bg-bg-main font-heading font-bold transition-all duration-200">
          <Link href="/patient/chat">
            <FaMessage className="ml-2 w-4 h-4 text-primary" />
            {t("contactDoctor")}
          </Link>
        </Button>

      </div>
    </div>
  );
}