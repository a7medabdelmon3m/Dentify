"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaXRay } from "react-icons/fa";
import { 
  FileText, 
  Stethoscope, 
  AlertCircle, 
  CheckCircle2, 
  Activity 
} from "lucide-react";

export interface AIAnalysisData {
  معلومات_الوثيقة?: {
    رقم_الملف_الطبي?: string;
    تاريخ_الإصدار?: string;
    مصدر_التقرير?: string;
  };
  الأعراض_والتاريخ_المرضي?: {
    مدة_الألم_المسجلة?: string;
    الأمراض_المزمنة?: string;
  };
  التقييم_الطبي_المبدئي?: {
    تصنيف_الحالة?: string;
    تشخيص_الذكاء_الاصطناعي?: string;
    القسم_الجامعي_المختص?: string;
    مستوى_أولوية_الحالة?: string;
  };
  خطة_الرعاية_والتوجيه?: {
    الخطوات_القادمة?: string;
  };
  إخلاء_مسؤولية_قانونية?: string;
}

interface XRayDialogProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  imageSrc?: string[];
  analysisData?: AIAnalysisData;
}

export function XRayDialog({
  isOpen,
  setIsOpen,
  imageSrc,
  analysisData,
}: XRayDialogProps) {
  const t = useTranslations("CreateCase.XRayDialog");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!imageSrc) {
      setPreviewUrl(null);
      return;
    }

    if (
      typeof window !== "undefined" &&
      imageSrc instanceof FileList &&
      imageSrc.length > 0
    ) {
      const url = URL.createObjectURL(imageSrc[0]);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }

    if (typeof imageSrc === "string") {
      setPreviewUrl(imageSrc);
    }
  }, [imageSrc]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl bg-bg-main border-border-light rounded-2xl gap-0 p-0 overflow-hidden shadow-2xl">
        
        {/* الهيدر */}
        <DialogHeader className="p-6 bg-white border-b border-border-light">
          <DialogTitle className="text-2xl font-bold text-text-title font-heading flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-xl">
              <FaXRay className="text-primary text-xl" />
            </div>
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-text-muted mt-1">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[65vh] overflow-y-auto p-6 space-y-6 no-scrollbar">
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-white border border-border-light shadow-sm shrink-0">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="X-ray"
                  fill
                  sizes="(max-width: 768px) 100vw, 192px"
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-text-muted text-sm font-medium">
                  {t("noImage")}
                </div>
              )}
            </div>

            <div className="flex-1 bg-white p-5 rounded-2xl border border-border-light shadow-sm space-y-3">
              <h4 className="flex items-center gap-2 text-primary font-bold mb-4">
                <FileText className="w-5 h-5" />
                {t("sections.documentInfo")}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-muted block mb-1">{t("labels.fileNumber")}</span>
                  <span className="font-bold text-text-title">{analysisData?.معلومات_الوثيقة?.رقم_الملف_الطبي || "---"}</span>
                </div>
                <div>
                  <span className="text-text-muted block mb-1">{t("labels.date")}</span>
                  <span className="font-bold text-text-title" dir="ltr">{analysisData?.معلومات_الوثيقة?.تاريخ_الإصدار || "---"}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-text-muted block mb-1">{t("labels.source")}</span>
                  <span className="font-bold text-text-title">{analysisData?.معلومات_الوثيقة?.مصدر_التقرير || "---"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border-light shadow-sm">
            <h4 className="flex items-center gap-2 text-primary font-bold mb-4 border-b border-border-light pb-3">
              <Stethoscope className="w-5 h-5" />
              {t("sections.medicalEval")}
            </h4>
            
            <div className="space-y-4 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-bg-main p-3 rounded-xl border border-border-light">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="font-bold text-text-title">{t("labels.caseClass")}:</span>
                  <span className="text-text-body">{analysisData?.التقييم_الطبي_المبدئي?.تصنيف_الحالة}</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg font-bold shadow-sm border border-border-light text-xs flex items-center gap-1.5">
                  {t("labels.priority")}: <span dangerouslySetInnerHTML={{ __html: analysisData?.التقييم_الطبي_المبدئي?.مستوى_أولوية_الحالة || "" }} />
                </div>
              </div>

              <div>
                <span className="font-bold text-text-title block mb-1">{t("labels.diagnosis")}:</span>
                <p className="text-text-body leading-relaxed bg-primary/5 p-4 rounded-xl border border-primary/10">
                  {analysisData?.التقييم_الطبي_المبدئي?.تشخيص_الذكاء_الاصطناعي}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-text-title">{t("labels.department")}:</span>
                <span className="text-text-body font-medium">{analysisData?.التقييم_الطبي_المبدئي?.القسم_الجامعي_المختص}</span>
              </div>
            </div>
          </div>

          <div className="bg-success/5 p-5 rounded-2xl border border-success/20">
            <h4 className="flex items-center gap-2 text-success font-bold mb-3">
              <CheckCircle2 className="w-5 h-5" />
              {t("sections.carePlan")}
            </h4>
            <p className="text-text-body text-sm leading-relaxed font-medium">
              {analysisData?.خطة_الرعاية_والتوجيه?.الخطوات_القادمة}
            </p>
          </div>

          {analysisData?.إخلاء_مسؤولية_قانونية && (
            <div className="flex gap-3 items-start text-xs text-text-muted bg-warning/10 p-4 rounded-xl">
              <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                {analysisData.إخلاء_مسؤولية_قانونية}
              </p>
            </div>
          )}

        </div>

        <DialogFooter className="p-4 bg-white border-t border-border-light sm:justify-center">
          <DialogClose asChild>
            <Button className="bg-primary text-white hover:bg-primary-hover rounded-xl px-12 py-6 font-bold shadow-md w-full sm:w-auto">
              {t("close")}
            </Button>
          </DialogClose>
        </DialogFooter>
        
      </DialogContent>
    </Dialog>
  );
}