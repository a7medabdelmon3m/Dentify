"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CalendarDays, ChevronLeft, Stethoscope, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface CaseCardProps {
  caseData: {
    id: string | number;
    patientName: string;
    specialty: string;
    date: string;
    status: "inProgress" | "completed";
  };
}

export default function CaseCard({ caseData }: CaseCardProps) {
  const t = useTranslations("StudentMyCases.card");
  const isCompleted = caseData.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-border-light rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      {/* ── الهيدر: حالة الكارت والتخصص ── */}
      <div className="flex justify-between items-start mb-4">
        <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5
          ${isCompleted ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}
        >
          {/* نقطة بتعمل Pulse للحالات اللي قيد التنفيذ */}
          {!isCompleted && <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />}
          {t(`status.${caseData.status}`)}
        </div>
        
        <div className="bg-primary/5 text-primary px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
          <Stethoscope className="w-3.5 h-3.5" />
          {caseData.specialty}
        </div>
      </div>

      {/* ── بيانات المريض ── */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-bg-main border border-border-light flex items-center justify-center text-primary shrink-0">
          <User className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-text-muted font-bold mb-0.5">{t("patient")}</p>
          <h3 className="text-lg font-bold text-text-title truncate max-w-[180px]">
            {caseData.patientName}
          </h3>
        </div>
      </div>

      <hr className="border-border-light mb-4" />

      {/* ── التاريخ والزرار ── */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-text-muted text-xs font-medium">
          <CalendarDays className="w-4 h-4" />
          <span dir="ltr">{caseData.date}</span>
        </div>

        {/* لينك بيودي لصفحة التفاصيل */}
        <Link href={`/student/my-patients/${caseData.id}`}>
          <Button 
            variant={isCompleted ? "outline" : "default"} 
            className={`rounded-xl font-bold flex items-center gap-2 ${
              isCompleted 
                ? "border-border-light text-text-title hover:bg-bg-main" 
                : "bg-primary hover:bg-primary-hover text-white shadow-sm"
            }`}
          >
            {t("viewDetails")}
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" /> 
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}