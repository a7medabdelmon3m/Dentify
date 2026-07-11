"use client";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ProposalActionCard({ caseId }: { caseId: number }) {
  const t = useTranslations("studentCaseDetails.proposalForm");
  const [isLoading, setIsLoading] = useState(false);
  const [isٍSuccess, setIsٍSuccess] = useState(false);

  async function handleSendRequestTraetment() {
    setIsLoading(true);
    const response = await dynamicApiAction(
      `TreatmentRequests/student/send/${caseId}`,
      "POST",
      undefined,
      undefined,
    );
    setIsLoading(false);
    if (response.success) {
      setIsٍSuccess(true);
      toast.success("تم إسال طلبك بنجاح ");
    } else {
      toast.error("عذرااً, فشل الإرسال حاول مجدداً!");
    }
  }
  return (
    <div className="flex gap-3 mt-4">
      {!isٍSuccess && (
        <Button
          disabled={isLoading}
          onClick={handleSendRequestTraetment}
          className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold transition-all cursor-pointer"
        >
          {isLoading ? t("submitting") : t("submitBtn")}
        </Button>
      )}
    </div>
  );
}
