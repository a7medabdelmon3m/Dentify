import React from "react";
import { getTranslations } from "next-intl/server";
import { ChevronRight, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

import CaseTabsClient from "./CaseTabsClient";
import { apiRequest } from "@/app/api/services/denti.services";
import { currentUserType, patientCaseType, studentTreatementRequest } from "@/type";
import { cookies } from "next/headers";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions";
import CaseChatTab from "./CaseChatTab";
import CaseRecordsTab from "./CaseRecordsTab";
import CaseAppointmentsTab from "./CaseAppointmentsTab";
import { FaCheck } from "react-icons/fa";
import EmptyState from "@/app/_components/EmptyState";
import { TfiLayoutPlaceholder } from "react-icons/tfi";

export default async function CaseDetailsPage() {
  const t = await getTranslations("CaseDetails");
  const d = await getTranslations("nonNumber_diseases");

  const cookieStore = await cookies();
  const token = cookieStore.get("tkn")?.value || "";
  
  const myAcceptedTreateMentRequest = await apiRequest<studentTreatementRequest[]>(`http://localhost:5123/api/TreatmentRequests/my/student`);
  const myTreatmentData = myAcceptedTreateMentRequest.data?.[0]; 
  
  const myPatientCase = await apiRequest<patientCaseType>(`http://localhost:5123/api/Case/${myTreatmentData?.caseId}`);
  const caseDetails = myPatientCase.data;

  console.log('myTreatmentDataId : ' , myTreatmentData?.requestId);
  
  const currentUeser = await apiRequest<currentUserType>(`http://localhost:5123/api/Authentication/currentuser`);
  const currentStudentId = currentUeser.data?.userId || "";

  let chatHistory: any[] = [];
  if (myTreatmentData?.requestId) {
    const chatRes = await dynamicApiAction(`Chat/${myTreatmentData.requestId}`, "GET");
    chatHistory = (chatRes?.data as any[]) || [];
  }

  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {!myTreatmentData ? (<EmptyState 
            icon={<TfiLayoutPlaceholder />
} 
            title={'لا يوجد مريض'} 
            description={`لم يتم تعيين مريض بعد `} 
          />) : 
        (<>
        <Link href="/student/my-patients" className="inline-block">
          <Button variant="ghost" className="text-text-muted hover:text-primary gap-2 font-bold px-0">
            <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            {t("backBtn")}
          </Button>
        </Link>

        <div className="bg-white border border-border-light rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-text-muted font-bold mb-1">{t("patientInfo.name")}</p>
              <h2 className="text-2xl font-extrabold text-text-title font-heading">
                {caseDetails?.patientName}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 bg-bg-main p-4 rounded-2xl border border-border-light">
            <div>
              <p className="text-xs text-text-muted font-bold mb-1">{t("patientInfo.specialty")}</p>
              <p className="text-sm font-bold text-text-title">
                {caseDetails?.specidRequiredSpecialization ? d(caseDetails.specidRequiredSpecialization) : ""}
              </p>
            </div>
            <div className="w-px h-8 bg-border-light hidden sm:block"></div>
            <div>
              <p className="text-xs text-text-muted font-bold mb-1">{t("patientInfo.date")}</p>
              <p className="text-sm font-bold text-text-title" dir="ltr">
                {caseDetails?.createdAt ? new Date(caseDetails.createdAt).toLocaleDateString('ar-EG') : ""}
              </p>
            </div>
          </div>
        </div>

       {myTreatmentData && caseDetails && (
          <CaseTabsClient 
            chatTab={
              <CaseChatTab 
                requestId={myTreatmentData.requestId as number}
                initialMessages={chatHistory}
                currentUserId={currentStudentId}
                token={token}
              />
            }
            recordsTab={
              <CaseRecordsTab
              diseaseKey={caseDetails.specidRequiredSpecialization}
                images={caseDetails.image ? [caseDetails.image] : []}
                aiData={null}
                rawAiResponse={caseDetails.aiAnalysisResult} 
              />
            }
            appointmentsTab={
              <CaseAppointmentsTab 
                treatmentRequestId={myTreatmentData.requestId as number} 
              />
            }
          />
        )}
        </>)
        }
        
        
      </div>
    </section>
  );
}