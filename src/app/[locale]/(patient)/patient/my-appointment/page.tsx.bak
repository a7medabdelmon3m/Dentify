import React from "react";
import { getTranslations } from "next-intl/server";
import NoAppointments from "./no-appointments";
import AppointmentSelectionCard from "./AppointmentSelectionCard"; // الكومبوننت اللي عملناه
import { appointmentType } from "@/type";
import { apiRequest } from "@/app/api/services/denti.services";

export default async function PatientAppointmentPage() {
  const t = await getTranslations("patientAppointment");
  const appoints = await apiRequest<appointmentType[]>(
    "http://localhost:5123/api/Appointments/My/Patient",
  );

  console.log("appoints : ", appoints);

  if (!appoints || !appoints.data || appoints.data.length === 0) {
    return <NoAppointments />;
  }
  const firstAppointment = appoints.data?.[0];
  const currentCaseId = firstAppointment?.caseId || "N/A";
  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-8 text-rightAr">
        <div className="mx-auto w-full max-w-2xl space-y-6 text-rightAr">
          {/* رأس الصفحة السيرفر */}
          <div className="flex flex-col gap-1.5 mb-8">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-text-title">
              {t("pageTitle")}
            </h1>
            <p className="text-sm font-medium text-text-muted">
              {t("pageDesc")}{" "}
              <span className="font-bold text-primary">#{currentCaseId}</span>
            </p>
          </div>

          {/* الكومبوننت التفاعلي */}
          <AppointmentSelectionCard
            appointments={appoints.data as appointmentType[]}
          />
        </div>
      </div>
    </section>
  );
}
