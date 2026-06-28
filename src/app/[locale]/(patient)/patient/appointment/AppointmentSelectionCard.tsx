"use client";

import React, { useState, useEffect } from "react"; // إضافة useEffect
import { useTranslations, useLocale } from "next-intl";
import {
  CalendarDays,
  MapPin,
  UserCheck,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { appointmentType } from "@/type";

export default function AppointmentSelectionCard({
  appointments,
}: {
  appointments: appointmentType[];
}) {
  const t = useTranslations("patientAppointment");
  const locale = useLocale();

  // 1. تعريف الـ State عشان نتفادى الـ Hydration Error
  const [isMounted, setIsMounted] = useState(false);
  const [selectedAptId, setSelectedAptId] = useState<number | null>(null);

  // 2. تحديث الـ State بعد أول ريندر في المتصفح
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsMounted(true);
  }, []);

  const doctorName = appointments?.length > 0 ? appointments[0].studentName : "";

  const formatDateTime = (isoDate: string) => {
    const dateObj = new Date(isoDate);
    const dateFormatter = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeFormatter = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return {
      fullDate: dateFormatter.format(dateObj),
      time: timeFormatter.format(dateObj),
    };
  };

  const handleConfirm = () => {
    if (!selectedAptId) return;
    console.log("تم تأكيد الموعد رقم:", selectedAptId);
  };

  // حماية إضافية لو الـ appointments مش موجودة
  if (!appointments || appointments.length === 0) return null;

  return (
    <div className="space-y-6 rounded-3xl border border-border-light bg-white p-6 shadow-md text-rightAr">
      {/* ... الهيدر وبانر الطبيب كما هما بدون تغيير ... */}
      <div className="flex items-center gap-3 pb-4 border-b border-border-light">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/10 bg-primary-subtle shrink-0">
          <Stethoscope className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold text-text-title">
            {t("appointmentTitle")}
          </h2>
          <p className="text-xs text-text-muted mt-0.5 font-medium">
            {t("selectionDesc")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-bg-main border border-border-light p-4 rounded-2xl">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0 border border-border-light">
          <UserCheck className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">
            {t("studentLabel")}
          </span>
          <span className="text-base font-extrabold text-text-title">
            د. {doctorName}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {appointments.map((apt) => {
          const { fullDate, time } = formatDateTime(apt.appointmentDate);
          const isSelected = selectedAptId === apt.id;

          return (
            <div
              key={apt.id}
              onClick={() => setSelectedAptId(apt.id)}
              className={`relative cursor-pointer transition-all duration-300 border-2 rounded-2xl p-5 ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                  : "border-border-light bg-white hover:border-primary/40 hover:bg-bg-main"
              }`}
            >
              <div
                className={`absolute top-1/2 -translate-y-1/2 left-5 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors bg-white ${isSelected ? "border-primary" : "border-gray-300"}`}
              >
                {isSelected && (
                  <div className="h-3 w-3 rounded-full bg-primary" />
                )}
              </div>

              <div className="pl-14 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-start gap-3 w-full sm:w-auto">
                  <CalendarDays className="mt-1 h-5 w-5 text-primary shrink-0" />
                  <div className="flex flex-col gap-0.5">
                    {/* 3. هنا بنعرض التاريخ والوقت لو المتصفح حمل بس (Mounted) غير كده نعرض نقط تحميل */}
                    <span className="text-sm font-bold text-text-title">
                      {isMounted ? fullDate : "..."} 
                    </span>
                    <span
                      className="text-lg font-extrabold text-primary"
                      dir="ltr"
                    >
                      {isMounted ? time : "..."}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-text-muted font-semibold bg-white px-3 py-2 rounded-xl border border-border-light shadow-sm w-full sm:w-auto mt-2 sm:mt-0">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="truncate">{apt.location}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <hr className="border-border-light" />

      <div className="w-full pt-2">
        <Button
          onClick={handleConfirm}
          disabled={!selectedAptId}
          className="w-full rounded-xl bg-primary py-6 font-heading font-bold text-white transition-all hover:bg-primary-hover shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle2 className="w-5 h-5" />
          {t("confirmAttendanceBtn")}
        </Button>
      </div>
    </div>
  );
}