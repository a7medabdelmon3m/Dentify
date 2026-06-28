import React from "react";
import { getTranslations } from "next-intl/server";
import {
  FaLocationDot,
  FaStethoscope,
  FaFileLines,
  FaWandMagicSparkles,
  FaUser,
} from "react-icons/fa6";
import ProposalActionCard from "../ProposalActionCard"; // المسار حسب ترتيبك
import CaseImagesGallery from "../CaseImagesGallery"; // المسار حسب ترتيبك
import { apiRequest } from "@/app/api/services/denti.services";
import { patientCaseType } from "@/type";
import NotFound from "@/app/[locale]/not-found";

// محاكاة لدالة جلب التفاصيل من الـ API
const getCaseDetails = async (id: string) => {
  return {
    id: id,
    patientName: "محمد علي محمود",
    age: 35,
    gender: "ذكر",
    city: "Beni_Suef",
    specialty: "Endodontics",
    description:
      "أعاني من ألم شديد ومستمر في الضرس الخلفي السفلي، الألم يزداد مع المشروبات الباردة والساخنة ويمنعني من النوم.",
    aiAnalysisResult:
      "بناءً على الأعراض المذكورة، يُرجح وجود التهاب حاد في عصب السن (Pulpitis). الحالة تتطلب تدخلاً سريعاً لإجراء علاج جذور (Root Canal Treatment).",
    images: [
      "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?q=80&w=400&auto=format&fit=crop", // صور تجريبية
      "https://images.unsplash.com/photo-1598256989800-fea5ce5142f4?q=80&w=400&auto=format&fit=crop",
    ],
  };
};
export default async function CaseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = await getTranslations("studentCaseDetails");
  const g = await getTranslations("governorates");
  const d = await getTranslations("CreateCase.diseases");
  const { id } = await params;

//   console.log("myCaseId : ", id);

  const response = await apiRequest<patientCaseType>(
    `http://localhost:5123/api/Case/${id}`, 
  );
  const caseDetails = response.data

  console.log('caseDetails' , caseDetails);
  
  const imagesArray = caseDetails?.image ? [caseDetails.image] : [];


  const caseData = await getCaseDetails(id);
  if(!caseDetails){
    <NotFound/>
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl animate-in fade-in zoom-in-95 duration-500">
      {/* ── عنوان الصفحة ── */}
      <div className="mb-6 text-rightAr">
        <h1 className="font-heading text-3xl font-bold text-text-title tracking-tight">
          {t("pageTitle")} <span className="text-primary">#{caseData.id}</span>
        </h1>
      </div>

      <div className="bg-white border border-border-light rounded-3xl shadow-sm p-6 md:p-8 space-y-8">
        {/* ── 1. بيانات المريض والتخصص ── */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pb-6 border-b border-border-light text-rightAr">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-subtle text-primary flex items-center justify-center shrink-0">
              <FaUser className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase mb-1">
                {t("patientInfo")}
              </p>
              <h2 className="text-xl font-bold text-text-title">
                {caseDetails?.patientName}
              </h2>
              <div className="flex items-center gap-3 text-sm font-semibold text-text-muted mt-1">
                <span>{caseData.age} سنة</span> • <span>{caseData.gender}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <span className="flex items-center gap-1.5 bg-bg-main border border-border-light px-3 py-1.5 rounded-xl text-xs font-bold text-text-title">
              <FaLocationDot className="text-primary w-3.5 h-3.5" />
              {g(caseDetails?.city as string)} 
            </span>
            <span className="flex items-center gap-1.5 bg-primary-subtle border border-primary/10 px-3 py-1.5 rounded-xl text-xs font-bold text-primary">
              <FaStethoscope className="w-3.5 h-3.5" />
              {d(caseDetails?.specidRequiredSpecialization as string)} 
            </span>
          </div>
        </div>

        {/* ── 2. الوصف والشكوى ── */}
        <div className="space-y-3 text-rightAr">
          <h3 className="font-heading font-bold text-lg text-text-title flex items-center gap-2">
            <FaFileLines className="w-5 h-5 text-primary" />
            {t("description")}
          </h3>
          <p className="text-base text-text-body leading-relaxed bg-bg-main p-5 rounded-2xl border border-border-light font-medium">
            {caseDetails?.description}
          </p>
        </div>

        {/* ── 3. تحليل الذكاء الاصطناعي (بتصميم بارز ومختلف) ── */}
        {caseDetails?.aiAnalysisResult && (
          <div className="space-y-3 text-rightAr">
            <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] border border-[#DDD6FE] p-6 rounded-2xl shadow-inner">
              <h3 className="font-heading font-bold text-lg text-[#6D28D9] flex items-center gap-2 mb-2">
                <FaWandMagicSparkles className="w-5 h-5" />
                {t("aiAnalysis")}
              </h3>
              <p className="text-[#4C1D95] font-semibold leading-relaxed">
                {caseDetails.aiAnalysisResult}
              </p>
            </div>
          </div>
        )}

        {/* ── 4. معرض الصور ── */}
        {
          
        }
        <CaseImagesGallery images={imagesArray} />
      </div>

      {/* ── 5. كارت تقديم العرض (Action Card) ── */}
      <ProposalActionCard caseId={caseDetails?.id as string|number} />
    </div>
  );
}
