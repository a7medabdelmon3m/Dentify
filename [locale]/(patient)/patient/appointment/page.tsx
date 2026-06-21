import React from "react";
import { getTranslations } from "next-intl/server";
import NoAppointments from "./no-appointments";
import AppointmentSelectionCard from "./AppointmentSelectionCard"; // الكومبوننت اللي عملناه
import { appointmentType } from "@/type";
import { apiRequest } from "@/app/api/services/denti.services";

// عدلنا الـ Mock عشان يرجع مواعيد متعددة للحالة الواحدة
// const getCaseData = async () => {
//   return {
//     caseId: 5678,
//     appointments: [
//       {
//         id: 1,
//         studentName: "أحمد محمد محمود",
//         location: "عيادة الجامعة، الدور الـ 2",
//         status: "PendingAcceptance" as const,
//         appointmentDate: "2026-06-09T17:30:00.000Z",
//       },
//       {
//         id: 2,
//         studentName: "أحمد محمد محمود",
//         location: "مستشفى الطلبة، غرفة 4",
//         status: "PendingAcceptance" as const,
//         appointmentDate: "2026-06-12T10:00:00.000Z",
//       }
//     ]
//   };
// };

export default async function PatientAppointmentPage() {
  const t = await getTranslations("patientAppointment");
  const appoints = await apiRequest<appointmentType[]>('http://localhost:5123/api/Appointments/My/Patient');

  console.log('appoints : ' , appoints );
  

  if (!appoints ) {
    return <NoAppointments />;
  }

  return (
    <div className="flex w-full flex-col p-6 text-center bg-bg-main">
      <div className="mx-auto w-full max-w-2xl space-y-6 text-rightAr">
        
        {/* رأس الصفحة السيرفر */}
        <div className="flex flex-col gap-1.5 mb-8">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-text-title">
            {t("pageTitle")}
          </h1>
          <p className="text-sm font-medium text-text-muted">
            {t("pageDesc")} <span className="font-bold text-primary">#{caseData.caseId}</span>
          </p>
        </div>

        {/* الكومبوننت التفاعلي */}
        <AppointmentSelectionCard appointments={caseData.appointments} />

      </div>
    </div>
  );
}