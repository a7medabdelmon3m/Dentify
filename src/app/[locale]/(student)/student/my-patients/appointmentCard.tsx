import React from 'react';
import { getTranslations } from 'next-intl/server';
import { MapPin, CheckCircle2, Clock, MinusCircle } from 'lucide-react';
import { appointmentType } from '@/type';

export default async function AppointmentCard({ appointment }: { appointment: appointmentType }) {
  const t = await getTranslations("CaseDetails.appointmentsTab");

  const dateObj = new Date(appointment.appointmentDate);
  const dateStr = dateObj.toLocaleDateString('ar-EG');
  const timeStr = dateObj.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

  const status = appointment.status.toLowerCase();
  const isIgnored = status === 'ignore' || status === 'rejected';
  
  let badgeStyle = "bg-primary/10 text-primary border-primary/20";
  let StatusIcon = Clock;

  if (status === 'accepted' || status === 'confirmed') {
    badgeStyle = "bg-success/10 text-success border-success/20";
    StatusIcon = CheckCircle2;
  } else if (status === 'pending') {
    badgeStyle = "bg-warning/10 text-warning border-warning/20";
    StatusIcon = Clock;
  } else if (isIgnored) {
    badgeStyle = "bg-border-main/50 text-text-muted border-border-main";
    StatusIcon = MinusCircle;
  }

  return (
    <div 
      className={`bg-white border p-5 rounded-xl transition-all ${
        isIgnored 
          ? "border-dashed border-border-light opacity-60 grayscale-[50%]" 
          : "border-border-light shadow-sm hover:shadow-md"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold ${badgeStyle}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {t(`status.${status}`) || status}
        </span>
      </div>
      
      <div className={`flex items-center gap-4 text-sm font-bold p-3 rounded-lg w-fit mb-4 ${
        isIgnored ? "bg-bg-main text-text-muted" : "bg-primary/5 text-primary"
      }`}>
        <span dir="ltr">{dateStr}</span>
        <span className={`w-1.5 h-1.5 rounded-full ${isIgnored ? "bg-border-main" : "bg-primary/50"}`}></span>
        <span dir="ltr">{timeStr}</span>
      </div>

      <div className={`flex items-center gap-2 text-sm font-bold ${isIgnored ? "text-text-muted" : "text-text-title"}`}>
        <MapPin className="w-4 h-4 text-text-muted" />
        <span className="text-text-muted">{t("location")}:</span>
        <span>{appointment.location}</span>
      </div>
    </div>
  );
}