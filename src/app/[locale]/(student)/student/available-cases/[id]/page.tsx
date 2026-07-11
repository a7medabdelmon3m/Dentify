import React from "react";
import {
  FaLocationDot,
  FaStethoscope,
  FaFileLines,
  FaWandMagicSparkles,
  FaUser,
  FaImage,
} from "react-icons/fa6";
import {
  Clock,
  Activity,
  BrainCircuit,
  AlertTriangle,
  Building2,
} from "lucide-react";

import { apiRequest } from "@/app/api/services/denti.services";
import { patientCaseType } from "@/type";
import NotFound from "@/app/[locale]/not-found";

import ProposalActionCard from "../ProposalActionCard";

import defaultCaseImage from "@/assets/images/default-case.jpg";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

// const governoratesMap: Record<string, string> = {
//   Cairo: "القاهرة",
//   Giza: "الجيزة",
//   Alexandria: "الإسكندرية",
//   Beni_Suef: "بني سويف",
//   Fayoum: "الفيوم",
//   Minya: "المنيا",
//   Asyut: "أسيوط",
// };

const diseasesMap: Record<string, string> = {
  Endodontics: "علاج جذور (Endodontics)",
  OralSurgery: "خلع جراحي (Oral Surgery)",
  Orthodontics: "تقويم أسنان (Orthodontics)",
  Periodontics: "علاج لثة (Periodontics)",
  Prosthodontics: "تركيبات (Prosthodontics)",
  Cleaning: "تنظيف جير (Scaling)",
};

const statusMap: Record<string, string> = {
  pending: "قيد المراجعة",
  assigned: "تم التوجيه للطبيب",
  completed: "مكتملة",
  rejected: "مرفوضة",
};

export default async function StudentCaseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const g = await getTranslations('governorates')
  const d = await getTranslations('nonNumber_diseases')
  const response = await apiRequest<patientCaseType>(
    `http://localhost:5123/api/Case/${id}`,
  );
  const caseDetails = response?.data;

  if (!caseDetails) {
    return <NotFound />;
  }

  let aiParsed: any = null;
  try {
    if (caseDetails.aiAnalysisResult) {
      aiParsed = JSON.parse(caseDetails.aiAnalysisResult);
    }
  } catch (error) {
    console.error("Error parsing AI Analysis Result", error);
  }

  const symptoms = aiParsed?.symptoms_and_history;
  const assessment = aiParsed?.initial_medical_assessment;

  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-rightAr">
          <h1 className="font-heading text-3xl font-bold text-text-title tracking-tight">
            تفاصيل الحالة الطبية{" "}
          </h1>

          {caseDetails.status && (
            <span
              className={`px-4 py-1.5 text-sm font-bold rounded-full border w-fit ${
                caseDetails.status.toLowerCase() === "pending"
                  ? "bg-warning/15 text-warning border-warning/20"
                  : caseDetails.status.toLowerCase() === "completed"
                    ? "bg-success/15 text-success border-success/20"
                    : "bg-primary/10 text-primary border-primary/20"
              }`}
            >
              {statusMap[caseDetails.status.toLowerCase()] ||
                caseDetails.status}
            </span>
          )}
        </div>

        <div className="bg-white border border-border-light rounded-3xl shadow-sm p-6 md:p-8 space-y-8">
          {(caseDetails?.patientName ||
            caseDetails?.city ||
            caseDetails?.specidRequiredSpecialization) && (
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pb-6 border-b border-border-light text-rightAr">
              {caseDetails?.patientName && (
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-subtle text-primary flex items-center justify-center shrink-0">
                    <FaUser className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-muted uppercase mb-1">
                      البيانات الأساسية
                    </p>
                    <h2 className="text-xl font-bold text-text-title">
                      {caseDetails.patientName}
                    </h2>
                    {((caseDetails as any)?.age ||
                      (caseDetails as any)?.gender) && (
                      <div className="flex items-center gap-3 text-sm font-semibold text-text-muted mt-1">
                        {(caseDetails as any)?.age && (
                          <span>{(caseDetails as any).age} سنة</span>
                        )}
                        {(caseDetails as any)?.age &&
                          (caseDetails as any)?.gender && <span>•</span>}
                        {(caseDetails as any)?.gender && (
                          <span>{(caseDetails as any).gender}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 w-full md:w-auto mt-4 md:mt-0">
                {caseDetails?.city && (
                  <span className="flex items-center gap-1.5 bg-bg-main border border-border-light px-3 py-1.5 rounded-xl text-xs font-bold text-text-title">
                    <FaLocationDot className="text-primary w-3.5 h-3.5 shrink-0" />
                    {g(caseDetails.city)}
                  </span>
                )}
                {caseDetails?.specidRequiredSpecialization && (
                  <span className="flex items-center gap-1.5 bg-primary-subtle border border-primary/10 px-3 py-1.5 rounded-xl text-xs font-bold text-primary">
                    <FaStethoscope className="w-3.5 h-3.5 shrink-0" />
                    {d(caseDetails.specidRequiredSpecialization)}
                  </span>
                )}
              </div>
            </div>
          )}

          {(caseDetails as any)?.description && (
            <div className="space-y-3 text-rightAr">
              <h3 className="font-heading font-bold text-lg text-text-title flex items-center gap-2">
                <FaFileLines className="w-5 h-5 text-primary shrink-0" />
                وصف الشكوى
              </h3>
              <p className="text-base text-text-body leading-relaxed bg-bg-main p-5 rounded-2xl border border-border-light font-medium">
                {(caseDetails as any).description}
              </p>
            </div>
          )}

          {caseDetails?.aiAnalysisResult && (
            <div className="text-rightAr">
              {aiParsed ? (
                <div className="flex flex-col gap-4 bg-primary/5 p-5 md:p-6 rounded-3xl border border-primary/10">
                  <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-4">
                    <BrainCircuit className="w-6 h-6 shrink-0" />
                    <span className="text-base font-bold uppercase">
                      تحليل الذكاء الاصطناعي
                    </span>
                  </div>

                  {(symptoms?.recorded_pain_duration ||
                    symptoms?.chronic_diseases) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {symptoms?.recorded_pain_duration && (
                        <div className="bg-white border border-primary/10 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                          <Clock className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-text-muted font-bold mb-1">
                              مدة الألم
                            </p>
                            <p className="text-sm font-bold text-text-title">
                              {symptoms.recorded_pain_duration}
                            </p>
                          </div>
                        </div>
                      )}

                      {symptoms?.chronic_diseases && (
                        <div className="bg-white border border-primary/10 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                          <Activity className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-text-muted font-bold mb-1">
                              الأمراض المزمنة
                            </p>
                            <p className="text-sm font-bold text-text-title">
                              {symptoms.chronic_diseases}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {assessment && (
                    <div className="bg-white border border-primary/10 rounded-xl p-5 shadow-sm space-y-4 mt-2">
                      {(assessment.ai_diagnosis ||
                        assessment.case_priority_level) && (
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          {assessment.ai_diagnosis && (
                            <div className="flex-1">
                              <p className="text-xs text-text-muted font-bold mb-1.5">
                                التشخيص المبدئي
                              </p>
                              <p className="text-base font-bold text-text-title leading-relaxed">
                                {assessment.ai_diagnosis}
                              </p>
                            </div>
                          )}
                          {assessment.case_priority_level && (
                            <span className="shrink-0 text-xs font-bold bg-warning/10 text-warning px-3 py-2 rounded-lg flex items-center gap-1.5">
                              <AlertTriangle className="w-4 h-4" />
                              {assessment.case_priority_level}
                            </span>
                          )}
                        </div>
                      )}

                      {assessment.specialized_university_department && (
                        <div className="flex items-center gap-2 pt-4 border-t border-border-light">
                          <Building2 className="w-5 h-5 text-primary shrink-0" />
                          <p className="text-sm font-bold text-text-title">
                            <span className="text-text-muted font-medium ml-1">
                              القسم الجامعي الموصى به:{" "}
                            </span>
                            {assessment.specialized_university_department}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] border border-[#DDD6FE] p-6 rounded-2xl shadow-inner">
                  <h3 className="font-heading font-bold text-lg text-[#6D28D9] flex items-center gap-2 mb-2">
                    <FaWandMagicSparkles className="w-5 h-5 shrink-0" />
                    التحليل المبدئي
                  </h3>
                  <p className="text-[#4C1D95] font-semibold leading-relaxed">
                    {caseDetails.aiAnalysisResult}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3 text-rightAr">
            <h3 className="font-heading font-bold text-lg text-text-title flex items-center gap-2">
              <FaImage className="w-5 h-5 text-primary shrink-0" />
            </h3>

            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-border-light bg-bg-main relative shadow-sm group">
              <Image
                src={caseDetails.image || defaultCaseImage.src}
                alt="صورة الحالة"
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>
          </div>

          <div className="pt-4 border-t border-border-light">
            <ProposalActionCard caseId={Number(caseDetails.id)} />
          </div>
        </div>
      </div>
    </section>
  );
}
