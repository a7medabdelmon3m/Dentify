import React from "react";
import { getTranslations } from "next-intl/server";
import PageHeader from "@/app/_components/PageHeader";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions";

// استدعاء الكومبوننتس المفصولة
import CaseDetailsHeader from "./CaseDetailsHeader";
import ChatTab from "./ChatTab";
import { apiRequest } from "@/app/api/services/denti.services";
import {
  currentUserType,
  patientCaseType,
  patientTreatementRequest,
  studentTreatementRequest,
} from "@/type";
import { cookies } from "next/headers";

export default async function ChatPage() {
  const t = await getTranslations("chat");

  const cookieStore = await cookies();
  const token = cookieStore.get("tkn")?.value || "";
  console.log("token : ", token);

  const requestRes = await apiRequest<patientTreatementRequest[]>(
    `http://localhost:5123/api/TreatmentRequests/cases`,
  );
  const requestDetails =
    (requestRes?.data?.[0] as patientTreatementRequest) || {};
  // console.log("requestDetails : ", requestDetails);

  const patientCase =
    await apiRequest<patientCaseType>(`http://localhost:5123/api/Case/${requestDetails?.caseId}
`);
  const patientCaseDetails = (patientCase?.data as patientCaseType) || {};

  const chatRes = await dynamicApiAction(`Chat/${requestDetails?.id}`, "GET");
  const chatHistory = (chatRes?.data as any[]) || [];

  const currentUeser = await apiRequest<currentUserType>(
    `http://localhost:5123/api/Authentication/currentuser`,
  );

  const currentUserId = currentUeser.data?.userId;
  return (
    <section className="flex-1 bg-bg-main p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-0">
        <div className="mb-6">
          <PageHeader title={t("pageTitle")} desc={t("pageDesc")} />
        </div>

        {requestDetails?.id ? (
          <>
            <CaseDetailsHeader
              requestId={requestDetails.id}
              otherPartyName={requestDetails.studentName}
              caseData={patientCaseDetails}
            />

            <ChatTab
              requestId={requestDetails.id}
              initialMessages={chatHistory}
              currentUserId={currentUserId as string}
              token={token}
            />
          </>
        ) : (
          <div className="bg-white p-10 rounded-3xl text-center text-text-muted font-bold border border-border-light">
            لا توجد تفاصيل للحالة حالياً.
          </div>
        )}
        <div className="h-6 bg-white border-x border-b border-border-light rounded-b-3xl"></div>
      </div>
    </section>
  );
}
