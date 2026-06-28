import React from "react";
// استيراد الأيقونات من fa6 حصرياً للاتساق البصري
import { FaUserCheck, FaCalendarCheck, FaMessage } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CaseAssignedBlocker({cId}:{cId:string}) {
  const t = useTranslations("available-doctors.assignedBlocker");

  return (
    <div className="flex flex-col items-center justify-center min-h-[55vh] w-full p-6 text-center animate-in fade-in zoom-in-95 duration-500">
      
      {/* حاوية الأيقونة - لون هادي ومريح يوضح إن الحالة تمام ومعاها دكتور */}
      <div className="flex items-center justify-center w-20 h-20 bg-primary-subtle text-primary border border-primary/10 rounded-2xl mb-6 shadow-sm">
        <FaUserCheck className="w-10 h-10" />
      </div>

      {/* المحتوى النصي - محاذاة وتنسيق مريح للمريض */}
      <div className="max-w-md space-y-3">
        <h3 className="font-heading font-bold text-xl md:text-2xl text-text-title tracking-tight">
          {t("title")}
        </h3>
        <p className="text-sm md:text-base text-text-muted font-medium leading-relaxed text-rightAr">
          {t("description")}
        </p>
      </div>

      {/* أزرار التوجيه الذكية (CTAs) - عشان المريض ميفضلش واقف في صفحة مقفولة */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md justify-center">
        
        {/* الزرار الأساسي: يوديه يتابع حالته */}
        <Button asChild className="h-12 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-heading font-bold shadow-sm transition-all duration-200 flex-1">
          <Link href={`/patient/dashboard#${cId}`}>
            <FaCalendarCheck className="ml-2 w-4 h-4" /> {/* الأيقونة على الشمال لتناسب اتجاه العربي */}
            {t("trackCaseBtn")}
          </Link>
        </Button>

        {/* الزرار الثانوي: يخليه يدخل يكلم الدكتور فوراً */}
        <Button asChild variant="outline" className="h-12 px-6 rounded-xl border-border-light text-text-title hover:bg-bg-main font-heading font-bold transition-all duration-200 flex-1">
          <Link href="/patient/chats/123">
            <FaMessage className="ml-2 w-4 h-4 text-primary" />
            {t("chatBtn")}
          </Link>
        </Button>
        
      </div>
    </div>
  );
}