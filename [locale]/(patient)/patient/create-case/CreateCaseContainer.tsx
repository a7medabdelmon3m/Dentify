"use client";
import CreateCaseForm from "@/app/[locale]/(patient)/patient/create-case/createCaseForm/CreateCaseForm";
import React, { useState } from "react";
import xRay from "@/assets/images/dental-x-rays.png";
import { XRayDialog } from "@/app/_components/x-rayDialog";
import { useTranslations } from "next-intl";

export default function CreateCaseContainer() {
  const t = useTranslations("CreateCase");
  const [isOpen, setIsOpen] = useState(false);

  function handleDialogOpen() {
    setIsOpen(!isOpen);
  }

  const dynamicAnalysis = `
${t("analysisReportTitle")}
Patient: Essam Azzam
${t("findingsLabel")}:
- Deep caries detected in tooth #36.
- Impacted wisdom teeth (18, 28).
${t("recommendationLabel")}: Root canal treatment for #36.
`;

  return (
    <div className="">
      <CreateCaseForm handleDialogOpen={handleDialogOpen} />

      <XRayDialog
        analysisText={dynamicAnalysis}
        imageSrc={xRay}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
