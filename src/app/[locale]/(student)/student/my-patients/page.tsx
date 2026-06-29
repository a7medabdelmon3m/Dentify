"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/app/_components/PageHeader"; // الكومبوننت بتاعك
import CaseCard from "./CaseCard";
import { FileQuestion } from "lucide-react";
import EmptyState from "@/app/_components/EmptyState";

// داتا وهمية للتجربة لحد ما نربط بالـ API
const MOCK_CASES = [
  { id: 1, patientName: "عصام عزام", specialty: "حشو عصب (Endo)", date: "2026-06-25", status: "inProgress" as const },
  { id: 2, patientName: "سارة محمد", specialty: "خلع جراحي", date: "2026-06-20", status: "inProgress" as const },
  { id: 3, patientName: "أحمد علي", specialty: "تركيبات ثابتة", date: "2026-05-10", status: "completed" as const },
  { id: 4, patientName: "منى خالد", specialty: "تنظيف جير (Perio)", date: "2026-04-05", status: "completed" as const },
];

export default function StudentMyCasesPage() {
  const t = useTranslations("StudentMyCases");
  const [activeTab, setActiveTab] = useState<"inProgress" | "completed">(
    "inProgress",
  );

  // فلترة الحالات بناءً على التاب اللي شغال
  const filteredCases = MOCK_CASES.filter((c) => c.status === activeTab);

  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
    <div className="max-w-7xl mx-auto space-y-8">
        {/* ── الهيدر ── */}
        <PageHeader title={t("pageTitle")} desc={t("pageDesc")} />

        {/* ── نظام التابات (Tabs) ── */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-border-light shadow-sm w-fit mx-auto lg:mx-0">
          <button
            type="button"
            onClick={() => setActiveTab("inProgress")}
            className={`relative px-8 py-3 rounded-xl font-bold text-sm transition-colors duration-300 ${
              activeTab === "inProgress"
                ? "text-primary"
                : "text-text-muted hover:text-text-title"
            }`}
          >
            {activeTab === "inProgress" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-primary/10 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{t("tabs.inProgress")}</span>
          </button>

          <button
            onClick={() => setActiveTab("completed")}
            className={`relative px-8 py-3 rounded-xl font-bold text-sm transition-colors duration-300 ${
              activeTab === "completed"
                ? "text-primary"
                : "text-text-muted hover:text-text-title"
            }`}
          >
            {activeTab === "completed" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-primary/10 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{t("tabs.completed")}</span>
          </button>
        </div>

        {/* ── عرض الحالات ── */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {filteredCases.length > 0 ? (
              <motion.div
                key={activeTab} // مفتاح عشان الأنيميشن يشتغل لما التاب يتغير
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredCases.map((caseItem) => (
                  <CaseCard key={caseItem.id} caseData={caseItem} />
                ))}
              </motion.div>
            ) : (
              <EmptyState
                icon={<FileQuestion className="w-10 h-10" />}
                title={t("emptyState.title")}
                description={t("emptyState.desc")}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
