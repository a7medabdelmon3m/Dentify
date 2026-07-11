"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { format, isValid } from "date-fns";
import { ar, enUS } from "date-fns/locale";

function formatAppointmentDateTimeNative(isoDate: string | undefined, localeStr: string) {
  if (!isoDate) return { fullDate: "-", time: "-" };
  const date = new Date(isoDate);
  if (!isValid(date)) return { fullDate: "-", time: "-" };

  const locale = localeStr?.toLowerCase().startsWith("ar") ? ar : enUS;

  const fullDate = format(date, "PPP", { locale });
  const time = format(date, "p", { locale });
  return { fullDate, time };
}
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { dynamicApiAction } from "../patient.actions";
import { appointmentType } from "@/type";


export default function NextAppointment({ appointment }: {appointment:appointmentType | null}) {
  const t = useTranslations("PatientDashboard");
  const locale = useTranslations("locale").toString(); 
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (newStatus: "Accepted" | "Declined") => {
    setIsLoading(true);
    try {
      await dynamicApiAction(`Appointments/${appointment?.id}/status`, 'POST', '', { status: newStatus });
      toast.success(newStatus === "Accepted" ? "تم تأكيد الموعد!" : "تم رفض الموعد.");
    } catch (error) {
      toast.error("حدث خطأ، حاول مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!appointment) {
    return (
      <div className="rounded-2xl border border-border-light bg-white p-6 shadow-md h-full flex flex-col items-center justify-center text-center space-y-2">
        <h3 className="font-heading text-lg font-bold text-text-title">{t("noNextAppointmentTitle")}</h3>
        <p className="text-sm text-text-muted">{t("noNextAppointmentDesc")}</p>
      </div>
    );
  }

  const { fullDate, time } = formatAppointmentDateTimeNative(appointment.appointmentDate, locale);

  return (
    <div className="space-y-4 rounded-2xl border border-border-light bg-white p-6 shadow-md h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border-light bg-bg-main">
            <CalendarDays className="h-5 w-5 text-text-body" />
          </div>
          <h3 className="font-heading text-lg font-bold text-text-title">{t("nextAppointmentTitle")}</h3>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
          appointment.status === "Pending" ? "bg-warning/10 text-warning border-warning/20" : 
          appointment.status === "Accepted" ? "bg-success/10 text-success border-success/20" : 
          "bg-danger/10 text-danger border-danger/20"
        }`}>
          {t(`appointmentStatus.${appointment.status}`)}
        </span>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-border-light bg-bg-main p-4">
        
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 text-primary" />
          <div className="space-y-0.5">
            <p className="text-xs text-text-muted">{t("dateTimeLabel")}</p>
            <p className="text-sm font-bold text-text-title">{fullDate} - {time}</p>
          </div>
        </div>

        <hr className="border-border-light" />

        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 text-primary" />
          <div className="space-y-0.5">
            <p className="text-xs text-text-muted">{t("locationLabel")}</p>
            <p className="text-sm font-bold text-text-title">{appointment.location}</p>
          </div>
        </div>
      </div>

      {appointment.status === "Pending" && (
        <div className="flex gap-3 pt-2">
          <Button 
            onClick={() => handleStatusChange("Accepted")}
            disabled={isLoading}
            className="flex-1 bg-success hover:bg-success/90 text-white rounded-xl"
          >
            {t("appointmentActions.confirm")}
          </Button>
          <Button 
            onClick={() => handleStatusChange("Declined")}
            disabled={isLoading}
            variant="outline"
            className="flex-1 border-danger text-danger hover:bg-danger/10 rounded-xl"
          >
            {t("appointmentActions.decline")}
          </Button>
        </div>
      )}
    </div>
  );
}