import PageHeader from "@/app/_components/PageHeader";
import { getTranslations } from "next-intl/server";
import ProposalsClient from "./ProposalsClient";
import { apiRequest } from "@/app/api/services/denti.services";
import { studentTreatementRequest } from "@/type";

export default async function ProposalsPage() {
  const t = await getTranslations("StudentProposals");

  const myRequestsPromise = apiRequest<studentTreatementRequest[]>(
    `http://localhost:5123/api/TreatmentRequests/my/student`
  );

  const receivedRequestsPromise = apiRequest<studentTreatementRequest[]>(
    `http://localhost:5123/api/TreatmentRequests/student/received-requests`
  );

  const [myRequestsRes, receivedRequestsRes] = await Promise.all([
    myRequestsPromise,
    receivedRequestsPromise
  ]);

  const myRequests = myRequestsRes?.data || [];
  const receivedRequests = receivedRequestsRes?.data || [];

  const formattedMyRequests = myRequests.map((p) => ({
    id: p.requestId,
    caseId: p.caseId,
    patientName: p.patientName || "اسم المريض غير متوفر",
    city: p.city || "غير محدد",
    date: p.createdAt && !p.createdAt.startsWith("0001") 
        ? new Date(p.createdAt).toISOString().split("T")[0] 
        : "تاريخ غير محدد",
    type: "myRequest" as const, 
    description: p.caseDescription || "لا يوجد وصف للحالة",
    diseaseName: p.caseStatus ? `حالة: ${p.caseStatus}` : "غير محدد",
    myOfferText: p.caseDescription || "", 
  }));

  const formattedReceivedRequests = receivedRequests.map((p) => ({
    id: p.requestId,
    caseId: p.caseId,
    patientName: p.patientName || "اسم المريض غير متوفر",
    city: p.city || "غير محدد",
    date: p.createdAt && !p.createdAt.startsWith("0001") 
        ? new Date(p.createdAt).toISOString().split("T")[0] 
        : "تاريخ غير محدد",
    type: "patientOffer" as const, 
    description: p.caseDescription || "لا يوجد وصف للحالة",
    diseaseName: p.caseStatus ? `حالة: ${p.caseStatus}` : "غير محدد",
    myOfferText: p.caseDescription || "", 
  }));

  const allFormattedProposals = [...formattedReceivedRequests, ...formattedMyRequests];

  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <PageHeader title={t("pageTitle")} desc={t("pageDesc")} />
        <ProposalsClient initialProposals={allFormattedProposals} />
      </div>
    </section>
  );
}