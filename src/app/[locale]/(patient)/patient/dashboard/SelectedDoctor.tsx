"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Stethoscope } from "lucide-react";

interface SelectedDoctorProps {
  doctorName: string | null;
}

export default function SelectedDoctor({ doctorName }: SelectedDoctorProps) {
  const t = useTranslations("PatientDashboard");

  return (
    <div className="space-y-4 rounded-2xl border border-border-light bg-white p-6 shadow-md h-full">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/10 bg-primary-subtle">
          <Stethoscope className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-heading text-lg font-bold text-text-title">
          {t("selectedDoctorTitle")}
        </h3>
      </div>

      {doctorName ? (
        <div className="flex items-start gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border-light bg-white shadow-sm text-3xl select-none">
          </div>
          <div className="space-y-1 pt-1 flex-1 text-rightAr">
            <p className="text-xs text-text-muted">{t("studentLabel")}</p>
            <p className="text-base font-bold text-text-black">{doctorName}</p>
            <p className="text-xs text-primary">{t("studentTitle")}</p> 
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4 bg-bg-main p-4 rounded-xl border border-border-light">
          <div className="space-y-1 flex-1 text-center">
            <p className="font-heading text-base font-bold text-text-title">
              {t("noDoctorSelectedTitle")}
            </p>
            <p className="text-sm font-medium leading-relaxed text-text-muted">
              {t("noDoctorSelectedDesc")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}