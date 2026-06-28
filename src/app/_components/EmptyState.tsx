
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Inbox } from "lucide-react"; // أيقونة افتراضية لو مبعتنش أيقونة

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string; // عشان لو حبيت تزود مسافات أو تعدل استايل من بره
}

export default function EmptyState({ 
  title, 
  description, 
  icon, 
  className = "" 
}: EmptyStateProps) {
  const t = useTranslations("EmptyState");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center py-20 text-center w-full ${className}`}
    >
      {/* ── الأيقونة ── */}
      <div className="w-20 h-20 bg-white border border-border-light rounded-full flex items-center justify-center mb-5 shadow-sm text-border-main">
        {icon ? icon : <Inbox className="w-10 h-10" />}
      </div>
      
      {/* ── العنوان والوصف ── */}
      {/* لو مبعتنش title أو description، هياخد النصوص الافتراضية من ملف الترجمة */}
      <h4 className="text-xl font-bold text-text-title mb-2">
        {title || t("defaultTitle")}
      </h4>
      <p className="text-text-muted font-medium max-w-sm mx-auto leading-relaxed">
        {description || t("defaultDesc")}
      </p>
    </motion.div>
  );
}