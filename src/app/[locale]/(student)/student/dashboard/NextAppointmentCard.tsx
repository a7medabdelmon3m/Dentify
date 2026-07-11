"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { CalendarDays, MapPin, Clock, CheckCircle } from "lucide-react";
import { format, isValid } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useRouter } from "next/navigation";

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
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions"; 
import { appointmentType } from "@/type";

export default function NextAppointment({ appointment }: {appointment:appointmentType}) {
  const t = useTranslations("PatientDashboard");
  const locale = useTranslations("locale").toString(); 
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    if (!appointment?.id) return;
    
    setIsLoading(true);
    try {
      const response = await dynamicApiAction(`Appointments/${appointment.id}/Select`, 'PUT');

      if (response?.success || response?.data) {
        toast.success("تم تأكيد الموعد بنجاح!");
        router.refresh(); 
      } else {
        toast.error((response?.error as string) || "حدث خطأ أثناء تأكيد الموعد.");
      }
    } catch (error) {
      toast.error("حدث خطأ في الاتصال بالسيرفر، يرجى المحاولة لاحقاً.");
      console.error("Error confirming appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!appointment) {
    return (
      <div className="rounded-2xl border border-border-light bg-white p-6 shadow-md h-full flex flex-col items-center justify-center text-center space-y-2 min-h-[250px]">
        <div className="w-12 h-12 rounded-full bg-bg-main flex items-center justify-center mb-2">
          <CalendarDays className="h-6 w-6 text-text-muted opacity-50" />
        </div>
        <h3 className="font-heading text-lg font-bold text-text-title">{t("noNextAppointmentTitle")}</h3>
        <p className="text-sm text-text-muted">{t("noNextAppointmentDesc")}</p>
      </div>
    );
  }

  const { fullDate, time } = formatAppointmentDateTimeNative(appointment.appointmentDate, locale);

  const isPending = appointment.status === "Pending" || appointment.status === "pending" || appointment.status === "0";
  const isAccepted = appointment.status === "Accepted" || appointment.status === "confirmed" || appointment.status === "1";

  return (
    <div className="space-y-4 rounded-2xl border border-border-light bg-white p-6 shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border-light bg-bg-main text-primary">
            <CalendarDays className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-lg font-bold text-text-title">{t("nextAppointmentTitle")}</h3>
        </div>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
          isPending ? "bg-warning/10 text-warning border-warning/20" : 
          isAccepted ? "bg-success/10 text-success border-success/20" : 
          "bg-danger/10 text-danger border-danger/20"
        }`}>
          {t(`appointmentStatus.${appointment.status}`)}
        </span>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-border-light bg-bg-main p-4 flex-1">
        
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 text-primary" />
          <div className="space-y-0.5">
            <p className="text-xs text-text-muted">{t("dateTimeLabel")}</p>
            <p className="text-sm font-bold text-text-title">{fullDate} - {time}</p>
          </div>
        </div>

        <hr className="border-border-light" />

        {/* المكان */}
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 text-primary" />
          <div className="space-y-0.5">
            <p className="text-xs text-text-muted">{t("locationLabel")}</p>
            <p className="text-sm font-bold text-text-title">{appointment.location}</p>
          </div>
        </div>
      </div>

      {isPending && (
        <div className="pt-2 mt-auto">
          <Button 
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl py-6 flex items-center justify-center gap-2 font-bold transition-all"
          >
            {isLoading ? (
              "جاري التأكيد..."
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                {t("appointmentActions.confirm")} 
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}