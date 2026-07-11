"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  CalendarDays, Stethoscope, User, 
  MapPin, Clock, Activity, BrainCircuit, 
  FileText, ShieldAlert, AlertTriangle, Building2, Trash2, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { toast } from "react-toastify";
import { patientCaseType } from "@/type";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions"; 

import caseImage from '@/assets/images/default-case.jpg'
import Image from "next/image";

export default function ComprehensiveCaseCard({ caseData }: { caseData: patientCaseType }) {
  const t = useTranslations("ComprehensiveCard");
  const tCity = useTranslations("governorates"); 

  const [imgError, setImgError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formattedDate = caseData?.createdAt 
    ? new Date(caseData.createdAt).toLocaleDateString("ar-EG") 
    : "";

  const status = caseData?.status?.toLowerCase() || "pending";
  const isCompleted = status === "completed";
  const isPending = status === "pending";

  let statusStyles = "bg-primary/10 text-primary border-primary/20";
  if (isCompleted) statusStyles = "bg-success/10 text-success border-success/20";
  if (isPending) statusStyles = "bg-warning/10 text-warning border-warning/20";
  if (status === "rejected") statusStyles = "bg-danger/10 text-danger border-danger/20";

  const handleDeleteCase = async () => {
    if (!window.confirm(t("deleteConfirm") || "هل أنت متأكد من رغبتك في حذف هذه الحالة نهائياً؟")) return;
    
    setIsDeleting(true);
    try {
      const response = await dynamicApiAction(`Case/${caseData.id}`, "DELETE");
      
      if (response?.success) {
        toast.success(t("deleteSuccess") || "تم حذف الحالة بنجاح.");
        window.location.reload();
      } else {
        toast.error(response?.error?.toString() || t("deleteError") || "فشل حذف الحالة، حاول مجدداً.");
      }
    } catch (error) {
      toast.error("حدث خطأ في الاتصال بالسيرفر.");
    } finally {
      setIsDeleting(false);
    }
  };

  let aiData: any = null;
  try {
    if (caseData?.aiAnalysisResult) {
      aiData = JSON.parse(caseData.aiAnalysisResult);
    }
  } catch (error) {
    console.error("Error parsing AI Analysis Result", error);
  }

  const docInfo = aiData?.document_info;
  const symptoms = aiData?.symptoms_and_history;
  const assessment = aiData?.initial_medical_assessment;
  const plan = aiData?.care_and_referral_plan;
  const disclaimer = aiData?.legal_disclaimer;

  const firstLetter = caseData?.patientName ? caseData.patientName.charAt(0).toUpperCase() : "";

  if (!caseData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-border-light rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4 pb-4 gap-2 flex-wrap">
        <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border ${statusStyles}`}>
          {isPending && <span className="w-2 h-2 rounded-full bg-warning animate-pulse shrink-0" />}
          {t(`status.${status}`) || caseData.status}
        </div>
        
        {docInfo?.medical_file_number && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted bg-bg-main px-3 py-1.5 rounded-xl border border-border-light">
            <FileText className="w-3.5 h-3.5" />
            <span dir="ltr">{docInfo.medical_file_number}</span>
          </div>
        )}
      </div>

      <div className="w-full h-48 sm:h-56 mb-5 rounded-2xl overflow-hidden border border-border-light bg-bg-main relative shadow-sm group">
        <Image 
          src={ (caseData.image && !imgError) ? caseData.image : caseImage.src } 
          alt="صورة الحالة الطبية" 
          onError={() => setImgError(true)} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      <div className="flex items-center gap-4 mb-5 border-b border-border-light pb-5">
        <div className="w-14 h-14 rounded-2xl border-2 border-primary/20 bg-primary/10 text-primary flex items-center justify-center shrink-0">
          {firstLetter ? (
            <span className="text-2xl font-heading font-bold">{firstLetter}</span>
          ) : (
            <User className="w-6 h-6" />
          )}
        </div>
        <div className="flex-1">
          {caseData.patientName && (
            <h3 className="text-lg font-bold text-text-title leading-tight mb-1">
              {caseData.patientName}
            </h3>
          )}
          <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted font-bold">
            {caseData.age !== undefined && caseData.age !== null && (
              <span className="flex items-center gap-1 bg-bg-main px-2 py-1 rounded-md">
                <User className="w-3 h-3 text-primary" /> {caseData.age} {t("yearsOld")}
              </span>
            )}
            {caseData.city && (
              <span className="flex items-center gap-1 bg-bg-main px-2 py-1 rounded-md">
                <MapPin className="w-3 h-3 text-primary" /> 
                {tCity.has(caseData.city) ? tCity(caseData.city) : caseData.city}
              </span>
            )}
          </div>
        </div>
      </div>

      {(symptoms?.recorded_pain_duration || symptoms?.chronic_diseases) && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {symptoms?.recorded_pain_duration && (
            <div className="bg-warning/5 border border-warning/10 rounded-xl p-3 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[10px] text-warning font-bold uppercase">
                <Clock className="w-3.5 h-3.5" /> {t("painDuration")}
              </div>
              <span className="text-sm font-bold text-text-title">
                {symptoms.recorded_pain_duration}
              </span>
            </div>
          )}
          {symptoms?.chronic_diseases && (
            <div className="bg-danger/5 border border-danger/10 rounded-xl p-3 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[10px] text-danger font-bold uppercase">
                <Activity className="w-3.5 h-3.5" /> {t("chronicDiseases")}
              </div>
              <span className="text-sm font-bold text-text-title">
                {symptoms.chronic_diseases}
              </span>
            </div>
          )}
        </div>
      )}

      {assessment && (assessment.ai_diagnosis || assessment.specialized_university_department) && (
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="flex items-center gap-1.5 text-sm font-bold text-primary">
              <BrainCircuit className="w-4 h-4" /> {t("aiAssessment")}
            </h4>
            {assessment.case_priority_level && (
              <span className="text-[10px] font-bold bg-white px-2 py-1 rounded-md shadow-sm border border-border-light flex items-center gap-1 text-text-title">
                <AlertTriangle className="w-3 h-3 text-warning" />
                {assessment.case_priority_level}
              </span>
            )}
          </div>

          <div className="space-y-3">
            {assessment.ai_diagnosis && (
              <div>
                <p className="text-[10px] text-text-muted font-bold mb-0.5">{t("diagnosis")}</p>
                <p className="text-sm font-bold text-text-title leading-relaxed">
                  {assessment.ai_diagnosis}
                </p>
              </div>
            )}
            
            {assessment.specialized_university_department && (
              <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-primary/10">
                <Building2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-text-muted font-bold">{t("recommendedDept")}</p>
                  <p className="text-xs font-bold text-text-title">{assessment.specialized_university_department}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {plan?.next_steps && (
        <div className="mb-5 flex-1">
          <h4 className="flex items-center gap-1.5 text-xs font-bold text-text-title mb-2">
            <Stethoscope className="w-3.5 h-3.5 text-success" /> {t("nextSteps")}
          </h4>
          <p className="text-xs text-text-muted font-medium leading-relaxed bg-bg-main p-3 rounded-xl border border-border-light">
            {plan.next_steps}
          </p>
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-border-light space-y-4">
        {disclaimer && (
          <p className="flex items-start gap-1.5 text-[9px] text-text-muted font-medium leading-tight">
            <ShieldAlert className="w-3 h-3 shrink-0 text-warning" />
            {disclaimer}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 flex-wrap">
          {isPending ? (
            <Button
              onClick={handleDeleteCase}
              disabled={isDeleting}
              variant="outline"
              className="border-danger/30 text-danger hover:bg-danger/10 hover:text-danger rounded-xl font-bold text-xs h-9 px-4 flex items-center gap-1.5 transition-all"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
              {t("deleteBtn") || "حذف الحالة"}
            </Button>
          ) : (
            <div /> 
          )}

          {formattedDate && (
            <div className="flex items-center gap-1.5 text-text-muted text-xs font-bold">
              <CalendarDays className="w-4 h-4" />
              <span dir="ltr">{formattedDate}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}