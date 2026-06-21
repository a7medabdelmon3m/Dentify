"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FaPaperPlane, FaXmark, FaUserDoctor } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // أو استخدم textarea عادية لو مش عندك
import { toast } from "react-toastify";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions";

export default function ProposalActionCard({
  caseId,
}: {
  caseId: number | string;
}) {
  const t = useTranslations("studentCaseDetails.proposalForm");
  const [isOpen, setIsOpen] = useState(false);
  const [proposalText, setProposalText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!proposalText.trim()) return;
    setIsSubmitting(true);

    const response = await dynamicApiAction(
      "TreatmentRequests/student/send",
      "POST",
      caseId,
      undefined,
    );
    // هنا هتنادي على الـ API عشان تبعت الـ Proposal
    console.log("Submitting proposal for case:", caseId, "Text:", proposalText);

    // محاكاة للتحميل
    if (response.success) {
      toast.success("تم إرسال عرضك للمريض بنجاح!");
      setIsSubmitting(false);
      setIsOpen(false);
      setProposalText("");
    } else {
        toast.error("للأسف فشل إرسال طلبك! حاول مجدداً");
    }
  };

  return (
    <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-hover text-white font-heading font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
        >
          <FaUserDoctor className="w-5 h-5" />
          {t("requestBtn")}
        </Button>
      ) : (
        <div className="bg-white border border-primary/20 rounded-3xl p-6 shadow-xl animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-start mb-4 text-rightAr">
            <div>
              <h3 className="font-heading font-bold text-xl text-primary flex items-center gap-2">
                <FaPaperPlane className="w-4 h-4" />
                {t("title")}
              </h3>
              <p className="text-sm text-text-muted mt-1 font-medium">
                {t("description")}
              </p>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-bg-main flex items-center justify-center text-text-muted hover:text-danger transition-colors"
            >
              <FaXmark className="w-4 h-4" />
            </Button>
          </div>

          <Textarea
            value={proposalText}
            onChange={(e) => setProposalText(e.target.value)}
            placeholder={t("placeholder")}
            className="min-h-[120px] bg-bg-main border-border-light rounded-2xl p-4 text-base resize-none focus-visible:ring-primary/50"
          />

          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !proposalText.trim()}
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold transition-all"
            >
              {isSubmitting ? t("submitting") : t("submitBtn")}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="h-12 rounded-xl border-border-light text-text-muted hover:bg-bg-main font-bold px-6"
            >
              {t("cancelBtn")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
