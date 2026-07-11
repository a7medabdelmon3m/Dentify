import React from "react";
import { getTranslations } from "next-intl/server";
import { CalendarClock, CheckCircle2, Clock } from "lucide-react";
import AppointmentCard from "./appointmentCard";
import CreateAppointmentButton from "./CreateAppointmentButton";
import { appointmentType } from "@/type";
import { apiRequest } from "@/app/api/services/denti.services";

export default async function CaseAppointmentsTab({ treatmentRequestId }: { treatmentRequestId: number }) {
  const t = await getTranslations("CaseDetails.appointmentsTab");

  const response = await apiRequest<appointmentType[]>(`http://localhost:5123/api/Appointments/My/Student`);
  const appointmentsList: appointmentType[] = response.data || [];
  
  

  const pendingCount = appointmentsList.filter(apt => apt.status.toLowerCase() === "pending").length;
  const hasConfirmed = appointmentsList.some(apt => apt.status.toLowerCase() === "accepted" || apt.status.toLowerCase() === "confirmed");
  
  const isProposeDisabled = hasConfirmed || pendingCount >= 1;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-primary/5 border border-primary/10 p-5 rounded-2xl">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-text-title mb-1">الموعد المقترح</h3>
          <p className="text-sm text-text-muted font-medium mb-3">اقترح موعداً للتواصل مع المريض.</p>
          
          {hasConfirmed ? (
            <p className="text-xs text-success font-bold bg-success/10 w-fit px-3 py-1.5 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t("confirmedWarning")}
            </p>
          ) : pendingCount >= 1 ? (
            <p className="text-xs text-warning font-bold bg-warning/10 w-fit px-3 py-1.5 rounded-lg flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              {t("limitWarning")} 
            </p>
          ) : null}
        </div>
        
        <CreateAppointmentButton 
          treatmentRequestId={treatmentRequestId} 
          isProposeDisabled={isProposeDisabled} 
        />
      </div>

      <div className="space-y-4">
        <h4 className="flex items-center gap-2 text-text-title font-bold border-b border-border-light pb-3">
          <CalendarClock className="w-5 h-5 text-primary" />
          {t("appointmentsList")}
        </h4>
        
        {appointmentsList.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {appointmentsList.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} />
            ))}
          </div>
        ) : (
          <div className="bg-bg-main/50 border border-dashed border-border-light p-8 rounded-xl text-center text-text-muted text-sm font-medium">
            {t("noAppointments")}
          </div>
        )}
      </div>

    </div>
  );
}