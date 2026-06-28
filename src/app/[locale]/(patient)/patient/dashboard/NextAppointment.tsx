"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { CalendarDays, MapPin } from "lucide-react";
import { format, isValid } from "date-fns";
import { ar, enUS } from "date-fns/locale";

interface NextAppointmentProps {
  appointmentDate: string | null;
  location: string | null;
}

export default function NextAppointment({ appointmentDate, location }: NextAppointmentProps) {
  const t = useTranslations("PatientDashboard");
  const locale = useTranslations("locale").toString();

  // تنسيق التاريخ/الوقت النظيف HCI (مقتبس من Turn 15)
  const formatAppointmentDateTimeNative = (isoDate: string | undefined | null) => {
    if (!isoDate) return { fullDate: "", time: "" };
    
    const dateObj = new Date(isoDate);
    
    if (!isValid(dateObj)) {
      return { fullDate: t("invalidDate"), time: t("invalidTime") };
    }
    
    const localeFns = locale === "ar" ? ar : enUS;
    
    return {
      fullDate: format(dateObj, "PPPP", { locale: localeFns }), // مثل: الأربعاء، ٩ يونيو ٢٠٢٦
      time: format(dateObj, "p", { locale: localeFns }),     // مثل: ٧:٣٠ م
    };
  };

  const { fullDate, time } = formatAppointmentDateTimeNative(appointmentDate);

  return (
    <div className="space-y-4 rounded-2xl border border-border-light bg-white p-6 shadow-md h-full">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border-light bg-bg-main shadow-inner">
          <CalendarDays className="h-5 w-5 text-text-body" />
        </div>
        <h3 className="font-heading text-lg font-bold text-text-title">
          {t("nextAppointmentTitle")}
        </h3>
      </div>

      {appointmentDate ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* التاريخ و الوقت - HCI: وضوح تام */}
          <div className="flex items-start gap-3 rounded-xl border border-border-light bg-bg-main p-4 md:col-span-2">
            <CalendarDays className="mt-1 h-6 w-6 text-primary" />
            <div className="flex-1 space-y-1 text-rightAr">
              <p className="text-xs text-text-muted">{t("dateTimeLabel")}</p>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <p className="text-sm font-bold text-text-title">{fullDate}</p>
                <p className="text-lg font-extrabold text-primary">{time}</p>
              </div>
            </div>
          </div>

          {/* المكان */}
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-text-body" />
            <div className="space-y-0.5 text-rightAr">
              <p className="text-xs text-text-muted">{t("locationLabel")}</p>
              <p className="text-sm font-semibold text-text-black">{location}</p>
            </div>
          </div>
          
        </div>
      ) : (
        <div className="flex items-start gap-4 bg-bg-main p-4 rounded-xl border border-border-light">
          <div className="space-y-1 flex-1 text-center">
            <p className="font-heading text-base font-bold text-text-title">
              {t("noNextAppointmentTitle")}
            </p>
            <p className="text-sm font-medium leading-relaxed text-text-muted">
              {t("noNextAppointmentDesc")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}