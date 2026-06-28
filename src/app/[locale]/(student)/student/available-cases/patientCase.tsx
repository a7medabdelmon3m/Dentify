"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  FaLocationDot,
  FaStethoscope,
  FaFileLines,
  FaClock,
  FaWandMagicSparkles,
  FaImage,
  FaArrowLeft,
  FaArrowRight
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { studentAvailableCaseType } from "@/type";
import Link from "next/link";

// دالة بسيطة لحساب الوقت
// بنخزن الـ formatters هنا عشان منعملهاش إنشاء من الصفر كل مرة
const formatters: Record<string, Intl.DateTimeFormat> = {};

export const formatDate = (isoString: string, locale: string) => {
  if (!isoString) return "";
  
  try {
    // لو الـ formatter بتاع اللغة دي مش موجود، اعمله مرة واحدة بس واحفظه
    if (!formatters[locale]) {
      formatters[locale] = new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    // استخدم الـ formatter الجاهز
    return formatters[locale].format(new Date(isoString));
  } catch (error) {
    // لو التاريخ راجع بايظ من الباك إيند، بنرجع الاسترينج زي ما هو كـ Fallback
    console.error("Invalid date string:", isoString);
    return isoString; 
  }
};

// ألوان الحالات
const statusConfig: Record<string, string> = {
  Pending: "bg-warning/15 text-warning border-warning/20",
  Assigned: "bg-success/15 text-success border-success/20",
  Completed: "bg-primary-subtle text-primary border-primary/20",
};

interface DetailedCaseCardProps {
  data: studentAvailableCaseType;
  onActionClick?: () => void;
}

export default function DetailedCaseCard({ data, onActionClick }: DetailedCaseCardProps) {
  const t = useTranslations("cases.DetailedCard");
  const g = useTranslations("governorates");
  const d = useTranslations("CreateCase.diseases");
  const locale = useLocale();
  const isArabic = locale === "ar";

  // State جديد عشان نراقب لو الصورة ضربت إيرور وهي بتحمل
  const [imgError, setImgError] = useState(false);

  const safeStatus = data.status || "Pending";

  return (
    <div className="bg-white border border-border-light rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 w-full p-5 lg:p-6 flex flex-col gap-5">
      
      {/* ── 1. الهيدر (معلومات أساسية وحالة) ── */}
      <div className="flex justify-between items-start border-b border-border-light pb-4">
        <div className="flex flex-col text-rightAr gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-text-title font-heading font-bold text-xl leading-tight">
              {data.patientName}
            </h2>
            <span className="text-xs font-bold text-text-muted bg-bg-main px-2 py-0.5 rounded-md">
              #{data.id}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted">
            <FaClock className="w-3 h-3" />
            <span dir="ltr">{formatDate(data.createdAt, locale)}</span>
          </div>
        </div>

        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${statusConfig[safeStatus] || statusConfig.Pending}`}>
          {t(`status.${safeStatus}`)}
        </span>
      </div>

      {/* ── 2. التخصص والمكان ── */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary-subtle border border-primary/10 text-primary text-xs font-bold px-3 py-1.5">
          <FaStethoscope className="w-3.5 h-3.5 shrink-0" />
          {data.specidRequiredSpecialization ? d(data.specidRequiredSpecialization) : t("unknownSpecialty")}
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-xl bg-bg-main border border-border-light text-text-body text-xs font-bold px-3 py-1.5">
          <FaLocationDot className="text-primary w-3.5 h-3.5 shrink-0" />
          {data.city ? g(data.city) : t("unknownCity")}
        </span>
      </div>

      {/* ── 3. وصف الحالة (الشكوى) ── */}
      <div className="flex flex-col gap-2">
        <span className="text-xs text-text-muted font-bold uppercase tracking-wider text-rightAr">
          {t("descLabel")}
        </span>
        <div className="flex gap-3 bg-bg-main border border-border-light rounded-2xl p-4">
          <FaFileLines className="shrink-0 mt-0.5 text-primary/50 w-4 h-4" />
          <p className="text-text-body text-sm font-medium leading-relaxed line-clamp-3 text-rightAr">
            {data.description || t("noDescription")}
          </p>
        </div>
      </div>

      {/* ── 4. الميديا وتحليل الذكاء الاصطناعي ── */}
      {(data.image || data.aiAnalysisResult) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* الصورة:
            ضفنا الشرط بتاع !imgError عشان لو الصورة باظت، البوكس ده يختفي خالص وميبوظش التصميم
          */}
          {data.image && !imgError ? (
            <div className="sm:col-span-1 relative h-32 rounded-2xl overflow-hidden border border-border-light bg-gray-50 group">
              <Image 
                src={data.image} 
                alt="Case X-Ray" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                // التريكة هنا: لو الرابط فيه مشكلة، هنغير الـ state عشان نخفي مساحة الصورة
                onError={() => setImgError(true)} 
              />
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <FaImage className="w-3 h-3" /> الأشعة
              </div>
            </div>
          ) : null}

          {/* تحليل الذكاء الاصطناعي */}
          {data.aiAnalysisResult ? (
            <div className={`flex flex-col gap-1.5 p-4 rounded-2xl border bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] border-[#DDD6FE] ${(data.image && !imgError) ? 'sm:col-span-2' : 'sm:col-span-3'}`}>
              <div className="flex items-center gap-1.5 text-[#6D28D9]">
                <FaWandMagicSparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">{t("aiAnalysisLabel")}</span>
              </div>
              <p className="text-[#4C1D95] text-sm font-semibold leading-relaxed line-clamp-3 text-rightAr">
                {data.aiAnalysisResult}
              </p>
            </div>
          ) : null}

        </div>
      )}

      {/* ── 5. الإجراء (Action Button) ── */}
      <div className="mt-2">
        <Link
        href={`/student/available-cases/${data.id}`}
          className="w-full h-12 rounded-xl text-sm font-heading font-bold bg-primary hover:bg-primary-hover text-white shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
        >
          {t("actionBtn")}
          {isArabic ? <FaArrowLeft className="w-4 h-4" /> : <FaArrowRight className="w-4 h-4" />}
        </Link>
      </div>

    </div>
  );
}