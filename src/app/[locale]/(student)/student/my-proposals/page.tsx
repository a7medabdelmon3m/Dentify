"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Ban,
  Trash2,
  XCircle,
  Stethoscope,
  CalendarDays,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EmptyState from "@/app/_components/EmptyState"; // استدعاء الـ Empty State بتاعنا
import PageHeader from "@/app/_components/PageHeader";
import { ProposalDetailsDialog } from "./ProposalDetailsDialog";

// داتا وهمية (هتتغير بـ API)
const MOCK_PROPOSALS = [
  {
    id: "101",
    patientName: "محمد علي محمود",
    specialty: "علاج جذور",
    date: "2026-06-27",
    status: "pending",
    text: "أهلاً بك، لدي خبرة ممتازة في علاج الجذور وأستطيع مساعدتك في حالتك.", // أضفنا الخاصية هنا
  },
  {
    id: "102",
    patientName: "سارة حسن",
    specialty: "خلع جراحي",
    date: "2026-06-26",
    status: "pending",
    text: "مرحباً، الحالة تتطلب خلع جراحي دقيق وأنا متاح للقيام بذلك.",
  },
  {
    id: "103",
    patientName: "أحمد سيد",
    specialty: "تنظيف جير",
    date: "2026-06-20",
    status: "rejected",
    text: "أنا مهتم بتنظيف الجير الخاص بك.",
  },
];

export default function Page() {
  const t = useTranslations("StudentProposals");
  const [activeTab, setActiveTab] = useState<"pending" | "rejected">("pending");
  const [proposals, setProposals] = useState(MOCK_PROPOSALS);

  // الفلترة بناءً على التاب النشط
  const filteredProposals = proposals.filter((p) => p.status === activeTab);
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  // دالة وهمية لإلغاء/حذف الطلب
  const handleRemoveProposal = (id: string) => {
    setProposals((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
    <div className="max-w-7xl mx-auto space-y-8">
        {/* ── الهيدر ── */}
        <PageHeader title={t("pageTitle")} desc={t("pageDesc")} />

        {/* ── نظام التابات ── */}
        <div className="flex overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl border border-border-light shadow-sm w-full sm:w-fit">
          {[
            {
              id: "pending",
              label: t("tabs.pending"),
              icon: Clock,
              color: "text-warning",
            },
            {
              id: "rejected",
              label: t("tabs.rejected"),
              icon: Ban,
              color: "text-danger",
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-colors duration-300 flex-1 sm:flex-none justify-center ${
                  isActive
                    ? "text-primary"
                    : "text-text-muted hover:text-text-title"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="proposalsTab"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon
                  className={`w-4 h-4 relative z-10 ${isActive ? tab.color : ""}`}
                />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── عرض الكروت ── */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {filteredProposals.length > 0 ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filteredProposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className={`bg-white p-5 rounded-2xl border shadow-sm flex flex-col gap-4 transition-all ${
                      activeTab === "rejected"
                        ? "border-danger/20 opacity-80"
                        : "border-border-light hover:shadow-md"
                    }`}
                  >
                    {/* الهيدر بتاع الكارت */}
                    <div className="flex justify-between items-start border-b border-border-light pb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            activeTab === "rejected"
                              ? "bg-danger/10 text-danger"
                              : "bg-warning/10 text-warning"
                          }`}
                        >
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-text-muted font-bold mb-0.5">
                            {t("card.patient")}
                          </p>
                          <h4 className="font-bold text-text-title text-sm">
                            {proposal.patientName}
                          </h4>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-md border ${
                          activeTab === "rejected"
                            ? "bg-danger/10 text-danger border-danger/20"
                            : "bg-warning/10 text-warning border-warning/20"
                        }`}
                      >
                        {t(`card.status.${proposal.status}`)}
                      </span>
                    </div>

                    {/* التخصص والتاريخ */}
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center gap-1.5 bg-bg-main border border-border-light px-3 py-1.5 rounded-lg text-xs font-bold text-text-title">
                        <Stethoscope className="text-primary w-3.5 h-3.5" />
                        {proposal.specialty}
                      </span>
                      <span className="flex items-center gap-1.5 bg-bg-main border border-border-light px-3 py-1.5 rounded-lg text-xs font-bold text-text-muted">
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span dir="ltr">{proposal.date}</span>
                      </span>
                    </div>

                    {/* الأكشن (زرار الحذف/الإلغاء) */}
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        onClick={() => handleRemoveProposal(proposal.id)}
                        className={`w-full font-bold text-xs rounded-xl h-10 flex items-center justify-center gap-2 transition-colors ${
                          activeTab === "rejected"
                            ? "hover:bg-danger hover:text-white border-border-light text-text-muted"
                            : "hover:bg-warning hover:text-white hover:border-warning border-border-light text-text-muted"
                        }`}
                      >
                        {activeTab === "rejected" ? (
                          <>
                            <Trash2 className="w-4 h-4" />
                            {t("card.deleteBtn")}
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            {t("card.cancelBtn")}
                          </>
                        )}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setSelectedProposal(proposal.text)} // افترضنا إن الداتا فيها الـ text
                        className="w-full mt-2 font-bold text-xs rounded-xl h-10 cursor-pointer hover:bg-gray-200 "
                      >
                        {t("detailsDialog.viewBtn")}
                      </Button>
                    </div>
                  </div>
                ))}
                <ProposalDetailsDialog
                  isOpen={!!selectedProposal}
                  setIsOpen={() => setSelectedProposal(null)}
                  proposalText={selectedProposal || ""}
                />
              </motion.div>
            ) : (
              <motion.div
                key="emptyState"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <EmptyState
                  icon={
                    activeTab === "pending" ? (
                      <Clock className="w-10 h-10" />
                    ) : (
                      <Ban className="w-10 h-10" />
                    )
                  }
                  title={
                    activeTab === "pending"
                      ? t("emptyState.pendingTitle")
                      : t("emptyState.rejectedTitle")
                  }
                  description={
                    activeTab === "pending"
                      ? t("emptyState.pendingDesc")
                      : t("emptyState.rejectedDesc")
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
