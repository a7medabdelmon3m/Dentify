"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  MessageSquareText,
  FileImage,
  CalendarDays,
  User,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import EmptyState from "@/app/_components/EmptyState";

import CaseRecordsTab from "../CaseRecordsTab";
import CaseChatTab from "../CaseChatTab";
import CaseAppointmentsTab from "../CaseAppointmentsTab";

// ... الداتا الوهمية اللي هتبعتها للكومبوننت عشان نجرب الشكل
const mockImages = [
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500", // صوره أسنان من النت للتجربة
  "https://images.unsplash.com/photo-1598256989800-fea5c5ce8720?w=500",
];
const mockAiData = {
  التقييم_الطبي_المبدئي: {
    تصنيف_الحالة: "تسوس متقدم",
    تشخيص_الذكاء_الاصطناعي: "يوجد تسوس في الضرس الخلفي ويحتاج لفحص...",
  },
};

// داتا وهمية للتجربة (هتتغير بداتا من الـ API)
const MOCK_CASE_DATA = {
  id: "1",
  patientName: "عصام عزام",
  specialty: "حشو عصب (Endo)",
  date: "2026-06-25",
  status: "inProgress",
};

export default function CaseDetailsPage() {
  const t = useTranslations("CaseDetails");
  // غيرنا treatment لـ appointments
  const [activeTab, setActiveTab] = useState<
    "chat" | "records" | "appointments"
  >("chat");

  return (
    <section className="flex-1 bg-bg-main min-h-screen pb-10">
      <div className="container p-4 mx-auto space-y-6">
        {/* ── زرار الرجوع ── */}
        <Link href="/student/my-patients" className="inline-block">
          <Button
            variant="ghost"
            className="text-text-muted hover:text-primary gap-2 font-bold px-0"
          >
            <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            {t("backBtn")}
          </Button>
        </Link>

        {/* ── كارت بيانات المريض (Header) ── */}
        <div className="bg-white border border-border-light rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-text-muted font-bold mb-1">
                {t("patientInfo.name")}
              </p>
              <h2 className="text-2xl font-extrabold text-text-title font-heading">
                {MOCK_CASE_DATA.patientName}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 bg-bg-main p-4 rounded-2xl border border-border-light">
            <div>
              <p className="text-xs text-text-muted font-bold mb-1">
                {t("patientInfo.specialty")}
              </p>
              <p className="text-sm font-bold text-text-title">
                {MOCK_CASE_DATA.specialty}
              </p>
            </div>
            <div className="w-px h-8 bg-border-light hidden sm:block"></div>
            <div>
              <p className="text-xs text-text-muted font-bold mb-1">
                {t("patientInfo.date")}
              </p>
              <p className="text-sm font-bold text-text-title" dir="ltr">
                {MOCK_CASE_DATA.date}
              </p>
            </div>
          </div>
        </div>

        {/* ── نظام التابات (Tabs Navigation) ── */}
        <div className="flex overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl border border-border-light shadow-sm w-full lg:w-fit">
          {[
            { id: "chat", label: t("tabs.chat"), icon: MessageSquareText },
            { id: "records", label: t("tabs.records"), icon: FileImage },
            {
              id: "appointments",
              label: t("tabs.appointments"),
              icon: CalendarDays,
            }, // التعديل هنا
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-colors duration-300 flex-1 lg:flex-none justify-center ${
                  isActive
                    ? "text-primary"
                    : "text-text-muted hover:text-text-title"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="detailsTabIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── محتوى التابات (Tab Content) ── */}
        <div className="bg-white border border-border-light rounded-3xl p-6 shadow-sm min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === "chat" && (
                <div className="h-full">
                  <CaseChatTab />
                </div>
              )}

              {activeTab === "records" && (
                <div className="h-full">
                  <CaseRecordsTab
                    description="أعاني من ألم شديد في الضرس السفلي الأيمن عند شرب المياه الباردة."
                    images={mockImages}
                    aiData={mockAiData}
                  />
                </div>
              )}

              {/* التعديل هنا: تاب المواعيد */}
              {activeTab === "appointments" && (
                <div className="h-full">
                  <CaseAppointmentsTab />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
