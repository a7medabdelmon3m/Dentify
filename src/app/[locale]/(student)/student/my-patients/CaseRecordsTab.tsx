"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { 
  Sparkles, 
  Image as ImageIcon, 
  Clock, 
  Activity, 
  BrainCircuit, 
  AlertTriangle, 
  Building2,
  MapPin,
  Stethoscope
} from "lucide-react";
import dynamic from 'next/dynamic';
import { AIAnalysisData } from "../../../../_components/x-rayDialog"; 

const XRayDialog = dynamic(
  () => import('@/app/_components/x-rayDialog').then((mod) => mod.XRayDialog),
  { ssr: false }
);

interface CaseRecordsTabProps {
  governorateKey?: string; 
  diseaseKey?: string;     
  images: string[]; 
  aiData: AIAnalysisData | null; 
  rawAiResponse?: string | null; 
}

export default function CaseRecordsTab({ 
  governorateKey, 
  diseaseKey, 
  images, 
  aiData, 
  rawAiResponse 
}: CaseRecordsTabProps) {
  
  const t = useTranslations("CaseDetails.recordsTab");
  const tGov = useTranslations("governorates");
  const tDisease = useTranslations("nonNumber_diseases");

  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

  let aiParsed: any = null;
  try {
    if (rawAiResponse) {
      aiParsed = JSON.parse(rawAiResponse);
    }
  } catch (error) {
    console.error("Error parsing AI Analysis Result", error);
  }

  const symptoms = aiParsed?.symptoms_and_history;
  const assessment = aiParsed?.initial_medical_assessment;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500" dir="rtl">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        <div className="flex flex-col gap-4 bg-slate-50 p-5 rounded-2xl border border-border-light lg:col-span-1 shadow-sm">
          <div className="flex items-center gap-2 text-primary border-b border-border-light pb-3">
            <Stethoscope className="w-5 h-5 shrink-0" />
            <span className="text-sm font-bold uppercase">بيانات الحالة الأساسية</span>
          </div>
          
          <div className="space-y-4 pt-1">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-xl shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-[11px] text-text-muted font-bold mb-1">المحافظة</p>
                <p className="text-sm font-bold text-text-title">
                  {governorateKey ? tGov(governorateKey) : "غير محدد"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-danger/10 p-2 rounded-xl shrink-0">
                <Activity className="w-5 h-5 text-danger" />
              </div>
              <div>
                <p className="text-[11px] text-text-muted font-bold mb-1">المرض / التخصص</p>
                <p className="text-sm font-bold text-text-title">
                  {diseaseKey ? tDisease(diseaseKey) : "غير محدد"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {aiParsed ? (
          <div className="flex flex-col gap-4 bg-primary/5 p-4 lg:p-5 rounded-2xl border border-primary/10 lg:col-span-2">
            <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-3">
              <BrainCircuit className="w-5 h-5 shrink-0" />
              <span className="text-sm font-bold uppercase">{t("aiAnalysisTab", { fallback: "تحليل الذكاء الاصطناعي" })}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-primary/10 rounded-xl p-3 flex items-start gap-2.5 shadow-sm">
                <Clock className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-text-muted font-bold mb-0.5">{t("painDuration", { fallback: "مدة الألم" })}</p>
                  <p className="text-sm font-bold text-text-title">{symptoms?.recorded_pain_duration || "—"}</p>
                </div>
              </div>
              <div className="bg-white border border-primary/10 rounded-xl p-3 flex items-start gap-2.5 shadow-sm">
                <Activity className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-text-muted font-bold mb-0.5">{t("chronicDiseases", { fallback: "الأمراض المزمنة" })}</p>
                  <p className="text-sm font-bold text-text-title leading-snug">{symptoms?.chronic_diseases || t("none", { fallback: "لا يوجد" })}</p>
                </div>
              </div>
            </div>

            {assessment && (
              <div className="bg-white border border-primary/10 rounded-xl p-4 shadow-sm space-y-3 mt-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] text-text-muted font-bold mb-1">{t("aiDiagnosis", { fallback: "التشخيص المبدئي" })}</p>
                    <p className="text-sm font-bold text-text-title leading-relaxed">
                      {assessment.ai_diagnosis}
                    </p>
                  </div>
                  {assessment.case_priority_level && (
                    <span className="shrink-0 text-[10px] font-bold bg-warning/10 text-warning px-2 py-1.5 rounded-md flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {assessment.case_priority_level}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 pt-3 border-t border-border-light">
                  <Building2 className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-xs font-bold text-text-title">
                    <span className="text-text-muted font-medium ml-1">{t("recommendedDept", { fallback: "القسم الموصى به" })}: </span>
                    {assessment.specialized_university_department}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : rawAiResponse ? (
          <div className="flex flex-col gap-2 bg-primary/5 p-5 rounded-2xl border border-primary/10 lg:col-span-2 shadow-sm">
            <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-3">
              <Sparkles className="w-5 h-5 shrink-0" />
              <span className="text-sm font-bold uppercase">{t("aiAnalysisTab", { fallback: "تحليل الذكاء الاصطناعي" })}</span>
            </div>
            <p className="font-medium text-text-title text-sm leading-relaxed mt-2">
              {rawAiResponse}
            </p>
          </div>
        ) : null}
      </div>

      <hr className="border-border-light" />

      <div className="space-y-4">
        <h4 className="flex items-center gap-2 text-text-title font-bold">
          <ImageIcon className="w-5 h-5 text-primary shrink-0" />
          {t("uploadedImages", { fallback: "الصور المرفقة والأشعة" })}
        </h4>
        
        {images && images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className="relative aspect-square rounded-2xl overflow-hidden border border-border-light shadow-sm group cursor-pointer" 
                onClick={() => setIsAiDialogOpen(true)}
              >
                <Image 
                  src={img} 
                  alt={`case-image-${idx}`} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-bg-main flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-border-main text-text-muted text-sm font-medium">
            <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
            {t("noImages", { fallback: "لا توجد صور مرفقة" })}
          </div>
        )}
      </div>

      <XRayDialog 
        isOpen={isAiDialogOpen} 
        setIsOpen={setIsAiDialogOpen} 
        imageSrc={images} 
      />

    </div>
  );
}