"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, MapPin, User, CalendarX2, 
  CalendarCheck, Hourglass, CheckCircle2 
} from "lucide-react";
import PageHeader from "@/app/_components/PageHeader";
import EmptyState from "@/app/_components/EmptyState";

// داتا وهمية للتيست
const MOCK_APPOINTMENTS = [
  {
    id: 1,
    patientName: "محمد علي محمود",
    date: "2026-06-30",
    time: "10:30 صباحاً",
    location: "عيادة الجامعة - الدور الثاني",
    status: "upcoming" // مؤكد وقادم
  },
  {
    id: 2,
    patientName: "سارة حسن",
    date: "2026-06-25",
    time: "01:00 مساءً",
    location: "مستشفى الطلبة - غرفة 4",
    status: "completed" // مكتمل
  },
  {
    id: 3,
    patientName: "أحمد سيد",
    date: "2026-07-05",
    time: "09:00 صباحاً",
    location: "العيادات الخارجية",
    status: "pending" // معلق (مستني تأكيد المريض)
  },
];

export default function StudentAppointmentsPage() {
  const t = useTranslations("studentAppointments");
  const [activeTab, setActiveTab] = useState<"confirmed" | "pending">("confirmed");

  // لوجيك الفلترة: المؤكد بياخد (upcoming و completed)، والمعلق بياخد (pending) بس
  const filteredAppointments = MOCK_APPOINTMENTS.filter((apt) => {
    if (activeTab === "confirmed") {
      return apt.status === "upcoming" || apt.status === "completed";
    }
    return apt.status === "pending";
  });

  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        <PageHeader 
          title={t("pageTitle")} 
          desc={t("pageDesc")} 
        />

        {/* ── نظام التابات (Tabs) ── */}
        <div className="flex overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl border border-border-light shadow-sm w-full sm:w-fit text-rightAr">
          {[
            { id: "confirmed", label: t("tabs.confirmed"), icon: CalendarCheck, color: "text-primary" },
            { id: "pending", label: t("tabs.pending"), icon: Hourglass, color: "text-warning" },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
              type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-colors duration-300 flex-1 sm:flex-none justify-center ${
                  isActive ? "text-primary" : "text-text-muted hover:text-text-title"
                }`}
              >
                
                {isActive && (
                  <motion.div
                    layoutId="appointmentsTab"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={`w-4 h-4 relative z-10 ${isActive ? tab.color : ""}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── عرض الكروت ── */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {filteredAppointments.length > 0 ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className={`bg-white p-6 rounded-3xl border shadow-sm transition-all hover:shadow-md ${
                      apt.status === "pending" ? "border-warning/20 opacity-90" : 
                      apt.status === "completed" ? "border-border-light opacity-75 grayscale-[30%]" : 
                      "border-primary/20"
                    }`}
                  >
                    {/* رأس الكارت (اسم المريض والحالة) */}
                    <div className="flex justify-between items-start mb-5 pb-5 border-b border-border-light text-rightAr">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                          apt.status === "pending" ? "bg-warning/10 text-warning" : 
                          apt.status === "completed" ? "bg-gray-100 text-gray-500" : 
                          "bg-primary/10 text-primary"
                        }`}>
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-text-muted mb-1">{t("card.patient")}</p>
                          <h3 className="font-heading font-bold text-text-title text-base">{apt.patientName}</h3>
                        </div>
                      </div>
                    </div>

                    {/* تفاصيل الميعاد */}
                    <div className="space-y-4 text-rightAr">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-bold text-text-title">
                          <Calendar className="w-4 h-4 text-text-muted" />
                          <span dir="ltr">{apt.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-text-title">
                          <Clock className="w-4 h-4 text-text-muted" />
                          <span>{apt.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm font-medium text-text-body bg-bg-main p-3 rounded-xl border border-border-light">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span className="truncate">{apt.location}</span>
                      </div>
                    </div>

                    {/* البادج (Badge) بتاع الحالة من تحت */}
                    <div className="mt-5 pt-4 border-t border-border-light flex justify-end">
                      {apt.status === "upcoming" && (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                          <CalendarCheck className="w-4 h-4" /> {t(`card.status.${apt.status}`)}
                        </span>
                      )}
                      {apt.status === "pending" && (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-warning bg-warning/10 px-3 py-1.5 rounded-lg">
                          <Hourglass className="w-4 h-4" /> {t(`card.status.${apt.status}`)}
                        </span>
                      )}
                      {apt.status === "completed" && (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                          <CheckCircle2 className="w-4 h-4" /> {t(`card.status.${apt.status}`)}
                        </span>
                      )}
                    </div>

                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="emptyState"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <EmptyState
                  icon={activeTab === "confirmed" ? <CalendarCheck className="w-12 h-12" /> : <Hourglass className="w-12 h-12" />}
                  title={t("emptyState.title")}
                  description={t("emptyState.description")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}