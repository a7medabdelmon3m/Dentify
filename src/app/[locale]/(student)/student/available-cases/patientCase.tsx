"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  FaLocationDot,
  FaStethoscope,
  FaClock,
  FaWandMagicSparkles,
  FaImage,
  FaArrowLeft,
  FaArrowRight
} from "react-icons/fa6";
import { studentAvailableCaseType } from "@/type";
import Link from "next/link";

const formatters: Record<string, Intl.DateTimeFormat> = {};

export const formatDate = (isoString: string, locale: string) => {
  if (!isoString) return "";
  
  try {
    if (!formatters[locale]) {
      formatters[locale] = new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return formatters[locale].format(new Date(isoString));
  } catch (error) {
    console.error("Invalid date string:", isoString);
    return isoString; 
  }
};

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
  const d = useTranslations("nonNumber_diseases");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [imgError, setImgError] = useState(false);

  const safeStatus = data.status || "Pending";

  let displayAiText = data.aiAnalysisResult;
  try {
    if (data.aiAnalysisResult) {
      const aiParsed = JSON.parse(data.aiAnalysisResult);
      if (aiParsed?.initial_medical_assessment?.ai_diagnosis) {
        displayAiText = aiParsed.initial_medical_assessment.ai_diagnosis;
      }
    }
  } catch (error) {
  }

  return (
    <div className="bg-white border border-border-light rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 w-full p-5 lg:p-6 flex flex-col gap-5">
      
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
          {t.has(`status.${safeStatus}`) ? t(`status.${safeStatus}`) : safeStatus}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary-subtle border border-primary/10 text-primary text-xs font-bold px-3 py-1.5">
          <FaStethoscope className="w-3.5 h-3.5 shrink-0" />
          {data.specidRequiredSpecialization 
            ? (d.has(data.specidRequiredSpecialization as any) 
                ? d(data.specidRequiredSpecialization as any) 
                : data.specidRequiredSpecialization) 
            : t("unknownSpecialty")}
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-xl bg-bg-main border border-border-light text-text-body text-xs font-bold px-3 py-1.5">
          <FaLocationDot className="text-primary w-3.5 h-3.5 shrink-0" />
          {data.city 
            ? (g.has(data.city as any) 
                ? g(data.city as any) 
                : data.city) 
            : t("unknownCity")}
        </span>
      </div>

      {(data.image || displayAiText) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {data.image && !imgError ? (
            <div className="sm:col-span-1 relative h-32 rounded-2xl overflow-hidden border border-border-light bg-gray-50 group">
              <Image 
                src={data.image} 
                alt="Case X-Ray" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                onError={() => setImgError(true)} 
              />
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <FaImage className="w-3 h-3" /> الأشعة
              </div>
            </div>
          ) : null}

          {displayAiText ? (
            <div className={`flex flex-col gap-1.5 p-4 rounded-2xl border bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] border-[#DDD6FE] ${(data.image && !imgError) ? 'sm:col-span-2' : 'sm:col-span-3'}`}>
              <div className="flex items-center gap-1.5 text-[#6D28D9]">
                <FaWandMagicSparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">{t("aiAnalysisLabel")}</span>
              </div>
              <p className="text-[#4C1D95] text-sm font-semibold leading-relaxed line-clamp-3 text-rightAr">
                {displayAiText}
              </p>
            </div>
          ) : null}

        </div>
      )}

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