'use client'
import CreateCaseForm from "@/app/_components/CreateCaseForm";
import React, { useState } from "react";
import xRay from "@/assets/images/dental-x-rays.png";
import { XRayDialog } from "@/app/_components/x-rayDialog";
import { useTranslations } from "next-intl";

export default function CreateCaseContainer() {
    const t = useTranslations("CreateCase");
    const [isOpen, setIsOpen] = useState(false)
    
    function handleDialogOpen(){
        setIsOpen(!isOpen) ;
    }

    // تقرير افتراضي يراعي الترجمة في العناوين
    const dynamicAnalysis = `
${t("analysisReportTitle")}
Patient: Essam Azzam
${t("findingsLabel")}:
- Deep caries detected in tooth #36.
- Impacted wisdom teeth (18, 28).
${t("recommendationLabel")}: Root canal treatment for #36.
`;

  return (
    <>
      <CreateCaseForm handleDialogOpen={handleDialogOpen} />

      <XRayDialog
        analysisText={dynamicAnalysis}
        imageSrc={xRay}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}