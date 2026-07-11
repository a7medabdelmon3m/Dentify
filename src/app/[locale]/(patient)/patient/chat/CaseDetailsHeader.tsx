
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { 
  FileText, 
  ClipboardList, 
  User, 
  MoreVertical, 
  MapPin, 
  CalendarDays, 
  Stethoscope, 
  Sparkles,
  Activity,
  BrainCircuit,
  Clock,
  AlertTriangle,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { patientCaseType } from "@/type";

// export type patientCaseType = {
//   id: number;
//   specidRequiredSpecialization: string;
//   description: string;
//   city: string;
//   status: string;
//   createdAt: string;
//   patientName: string;
//   image: string;
//   aiAnalysisResult: string | null;
// };

interface CaseDetailsProps {
  requestId: number;
  otherPartyName: string;
  caseData: patientCaseType; 
}

export default function CaseDetailsHeader({ requestId, otherPartyName, caseData }: CaseDetailsProps) {
  const t = useTranslations("chat");

  const formattedDate = caseData.createdAt 
    ? new Date(caseData.createdAt).toLocaleDateString('ar-EG') 
    : "غير محدد";

  let aiData: any = null;
  try {
    if (caseData.aiAnalysisResult) {
      aiData = JSON.parse(caseData.aiAnalysisResult);
    }
  } catch (error) {
    console.error("Error parsing AI Analysis Result", error);
  }

  const symptoms = aiData?.symptoms_and_history;
  const assessment = aiData?.initial_medical_assessment;

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-5 md:p-6 rounded-3xl border border-border-light shadow-sm">
        
        <div className="flex items-center gap-4 mb-5 border-b border-border-light pb-4">
          <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg text-text-title">{t("caseDetails")}</h2>
            <p className="text-xs text-text-muted font-bold mt-0.5">#{caseData.id} - {caseData.patientName}</p>
          </div>
        </div>
        
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="flex items-center gap-1.5 bg-bg-main border border-border-light px-3 py-1.5 rounded-lg text-xs font-bold text-text-title">
              <MapPin className="text-primary w-4 h-4" />
              {caseData.city}
            </span>
            <span className="flex items-center gap-1.5 bg-bg-main border border-border-light px-3 py-1.5 rounded-lg text-xs font-bold text-text-title">
              <Stethoscope className="text-primary w-4 h-4" />
              {caseData.specidRequiredSpecialization}
            </span>
            <span className="flex items-center gap-1.5 bg-bg-main border border-border-light px-3 py-1.5 rounded-lg text-xs font-bold text-text-muted">
              <CalendarDays className="w-4 h-4" />
              <span dir="ltr">{formattedDate}</span>
            </span>
            <span className="flex items-center gap-1.5 bg-warning/10 border border-warning/20 text-warning px-3 py-1.5 rounded-lg text-xs font-bold capitalize">
              <Activity className="w-4 h-4" />
              {caseData.status}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            <div className="flex flex-col gap-3 bg-slate-50 p-4 lg:p-5 rounded-2xl border border-border-light lg:col-span-1">
              <div className="flex items-center gap-2 text-text-muted border-b border-border-light pb-3">
                <ClipboardList className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase">{t("patientRequest")}</span>
              </div>
              {/* <p className="font-medium text-text-body text-sm leading-relaxed text-rightAr">
                {caseData.description || t("noDescription")}
              </p> */}
            </div>

            {aiData ? (
              <div className="flex flex-col gap-4 bg-primary/5 p-4 lg:p-5 rounded-2xl border border-primary/10 lg:col-span-2">
                <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-3">
                  <BrainCircuit className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-bold uppercase">{t("aiAnalysisTab")}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-primary/10 rounded-xl p-3 flex items-start gap-2.5 shadow-sm">
                    <Clock className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-text-muted font-bold mb-0.5">{t("painDuration")}</p>
                      <p className="text-sm font-bold text-text-title">{symptoms?.recorded_pain_duration || "—"}</p>
                    </div>
                  </div>
                  <div className="bg-white border border-primary/10 rounded-xl p-3 flex items-start gap-2.5 shadow-sm">
                    <Activity className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-text-muted font-bold mb-0.5">{t("chronicDiseases")}</p>
                      <p className="text-sm font-bold text-text-title">{symptoms?.chronic_diseases || t("none")}</p>
                    </div>
                  </div>
                </div>

                {assessment && (
                  <div className="bg-white border border-primary/10 rounded-xl p-4 shadow-sm space-y-3 mt-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] text-text-muted font-bold mb-1">{t("aiDiagnosis")}</p>
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
                        <span className="text-text-muted font-medium ml-1">{t("recommendedDept")}: </span>
                        {assessment.specialized_university_department}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : caseData.aiAnalysisResult ? (
              <div className="flex flex-col gap-2 bg-primary/5 p-5 rounded-2xl border border-primary/10 lg:col-span-2">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase">{t("aiAnalysisTab")}</span>
                </div>
                <p className="font-medium text-text-title text-sm leading-relaxed text-rightAr italic">
                  {caseData.aiAnalysisResult}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-[#1F2A44] text-white rounded-t-3xl p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-lg">{otherPartyName || "جاري التحميل..."}</p>
            <p className="text-xs text-white/70">{t("statusOnline")}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full w-10 h-10 p-0">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem className="cursor-pointer">{t("menuBlock")}</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-danger">{t("menuDelete")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

    </div>
  );
}