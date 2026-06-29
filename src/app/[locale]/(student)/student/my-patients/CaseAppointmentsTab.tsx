"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { CalendarPlus, CalendarClock, CheckCircle2, Clock, MapPin, MinusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookAppointmentModal from "@/app/_components/BookAppointmentModal/BookAppointmentModal"; // تأكد من مسار الملف عندك

// غيرنا الداتا هنا خلينا الأول pending عشان الزرار يفضل شغال للتجربة
const MOCK_APPOINTMENTS = [
  { id: 1, date: "2026-07-02", time: "10:00 AM", location: "عيادة 3 - الدور الثاني", status: "pending" },
  { id: 2, date: "2026-07-03", time: "11:30 AM", location: "عيادة 1 - الدور الأول", status: "ignored" },
];

// كومبوننت شارة الحالة
const StatusBadge = ({ status, t }: { status: string, t: any }) => {
  const styles: Record<string, string> = {
    confirmed: "bg-success/10 text-success border-success/20",
    pending: "bg-warning/10 text-warning border-warning/20",
    ignored: "bg-border-main/50 text-text-muted border-border-main", 
  };
  
  const Icons: Record<string, any> = {
    confirmed: CheckCircle2,
    pending: Clock,
    ignored: MinusCircle, 
  };

  const Icon = Icons[status];

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold ${styles[status]}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {t(`status.${status}`)}
    </span>
  );
};

export default function CaseAppointmentsTab({ treatmentRequestId = 1234 }: { treatmentRequestId?: number }) {
  const t = useTranslations("CaseDetails.appointmentsTab");
  
  // State لفتح وقفل المودال
  const [isModalOpen, setIsModalOpen] = useState(false);

  // اللوجيك للتحكم في الزرار
  const pendingCount = MOCK_APPOINTMENTS.filter(apt => apt.status === "pending").length;
  const hasConfirmed = MOCK_APPOINTMENTS.some(apt => apt.status === "confirmed");
  
  // الزرار يقفل لو فيه موعد مؤكد، أو لو اقترحنا موعدين ولسه pending
  const isProposeDisabled = hasConfirmed || pendingCount >= 2;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* ── 1. الهيدر وزرار اقتراح موعد ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-primary/5 border border-primary/10 p-5 rounded-2xl">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-text-title mb-1">الموعد المقترح</h3>
          <p className="text-sm text-text-muted font-medium mb-3">اقترح موعداً أو موعدين كحد أقصى للتواصل مع المريض.</p>
          
          {/* رسائل التحذير بتظهر حسب الحالة */}
          {hasConfirmed ? (
            <p className="text-xs text-success font-bold bg-success/10 w-fit px-3 py-1.5 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t("confirmedWarning")}
            </p>
          ) : pendingCount >= 2 ? (
            <p className="text-xs text-warning font-bold bg-warning/10 w-fit px-3 py-1.5 rounded-lg flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              {t("limitWarning")}
            </p>
          ) : null}
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)} // فتح المودال عند الضغط
          disabled={isProposeDisabled}
          className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-md flex items-center gap-2 py-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <CalendarPlus className="w-5 h-5" />
          {t("proposeBtn")}
        </Button>
      </div>

      {/* ── 2. قائمة المواعيد ── */}
      <div className="space-y-4">
        <h4 className="flex items-center gap-2 text-text-title font-bold border-b border-border-light pb-3">
          <CalendarClock className="w-5 h-5 text-primary" />
          {t("appointmentsList")}
        </h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {MOCK_APPOINTMENTS.length > 0 ? (
            MOCK_APPOINTMENTS.map((apt) => {
              const isIgnored = apt.status === "ignored";
              
              return (
                <div 
                  key={apt.id} 
                  className={`bg-white border p-5 rounded-xl transition-all ${
                    isIgnored ? "border-dashed border-border-light opacity-60 grayscale-[50%]" : "border-border-light shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <StatusBadge status={apt.status} t={t} />
                  </div>
                  
                  {/* التاريخ والساعة */}
                  <div className={`flex items-center gap-4 text-sm font-bold p-3 rounded-lg w-fit mb-4 ${
                    isIgnored ? "bg-bg-main text-text-muted" : "bg-primary/5 text-primary"
                  }`}>
                    <span dir="ltr">{apt.date}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isIgnored ? "bg-border-main" : "bg-primary/50"}`}></span>
                    <span dir="ltr">{apt.time}</span>
                  </div>

                  {/* المكان */}
                  <div className={`flex items-center gap-2 text-sm font-bold ${isIgnored ? "text-text-muted" : "text-text-title"}`}>
                    <MapPin className="w-4 h-4 text-text-muted" />
                    <span className="text-text-muted">{t("location")}:</span>
                    <span>{apt.location}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="lg:col-span-2 bg-bg-main/50 border border-dashed border-border-light p-8 rounded-xl text-center text-text-muted text-sm font-medium">
              {t("noAppointments")}
            </div>
          )}
        </div>
      </div>

      {/* ── المودال الخاص بالحجز ── */}
      <BookAppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        treatmentRequestId={treatmentRequestId} 
      />

    </div>
  );
}