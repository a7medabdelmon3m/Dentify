"use client";
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing"; // تأكد من مسار الـ Link الخاص بـ next-intl عندك

export default function NoCaseCard() {
  const t = useTranslations("cases.NoCaseCard");

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white border border-dashed border-gray-300 rounded-xl shadow-sm max-w-2xl mx-auto my-6 space-y-4">
      {/* أيقونة تعبيرية لطيفة خفيفة باللون الموتد */}
      <div className="p-4 bg-primary-subtle rounded-full text-primary">
        <Plus className="w-8 h-8 stroke-[1.5]" />
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-heading font-bold text-text-title">
          {t("title")}
        </h4>
        <p className="text-text-muted font-medium text-sm max-w-md mx-auto leading-relaxed">
          {t("description")}
        </p>
      </div>

      {/* زرار يودي المريض لصفحة إنشاء حالة جديدة */}
      <Button asChild className="bg-primary hover:bg-primary-hover text-white px-6 py-5 rounded-lg font-medium transition-all gap-2 shadow-sm">
        <Link href="/patient/create-case">
          <Plus className="w-4 h-4" />
          {t("buttonText")}
        </Link>
      </Button>
    </div>
  );
}