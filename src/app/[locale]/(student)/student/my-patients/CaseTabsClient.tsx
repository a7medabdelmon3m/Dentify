"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, FileImage, CalendarDays } from "lucide-react";

interface CaseTabsClientProps {
  chatTab: React.ReactNode;
  recordsTab: React.ReactNode;
  appointmentsTab: React.ReactNode;
}

export default function CaseTabsClient({
  chatTab,
  recordsTab,
  appointmentsTab
}: CaseTabsClientProps) {
  const t = useTranslations("CaseDetails");
  const [activeTab, setActiveTab] = useState<"chat" | "records" | "appointments">("chat");

  return (
    <>
      <div className="flex overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl border border-border-light shadow-sm w-full lg:w-fit">
        {[
          { id: "chat", label: t("tabs.chat"), icon: MessageSquareText },
          { id: "records", label: t("tabs.records"), icon: FileImage },
          { id: "appointments", label: t("tabs.appointments"), icon: CalendarDays },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-colors duration-300 flex-1 lg:flex-none justify-center ${
                isActive ? "text-primary" : "text-text-muted hover:text-text-title"
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
            {activeTab === "chat" && <div className="h-full">{chatTab}</div>}
            {activeTab === "records" && <div className="h-full">{recordsTab}</div>}
            {activeTab === "appointments" && <div className="h-full">{appointmentsTab}</div>}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}