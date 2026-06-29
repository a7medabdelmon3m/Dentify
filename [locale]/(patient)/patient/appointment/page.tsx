import React from "react";
import { getTranslations } from "next-intl/server";
import NoAppointments from "./no-appointments";
import AppointmentSelectionCard from "./AppointmentSelectionCard";
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

  // استخدام أول موعد لاستخراج الـ CaseID بشكل آمن
  const currentCaseId = appoints.data?.[0]?.caseId || "N/A";

  // تحويل البيانات لضمان تطابق الـ Type (مهم جداً للـ Build)
  const formattedAppointments = appoints.data.map((item) => ({
    ...item,
    // إجبار الـ status على القيم اللي الكومبوننت بيقبلها
    status: (item.status as "Confirmed" | "PendingAcceptance" | "Cancelled") || "PendingAcceptance",
  }));

  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-2xl space-y-8 text-rightAr">
        {/* رأس الصفحة */}
        <div className="flex flex-col gap-1.5 mb-8">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-text-title">
            {t("pageTitle")}
          </h1>
          <p className="text-sm font-medium text-text-muted">
            {t("pageDesc")}{" "}
            <span className="font-bold text-primary">
              #{currentCaseId}
            </span>
          </p>
        </div>

        {/* الكومبوننت التفاعلي */}
        <AppointmentSelectionCard
          // هنا بعتنا البيانات المتوافقة
          appointments={formattedAppointments as any}
        />
      </div>
    </section>
  );
}
