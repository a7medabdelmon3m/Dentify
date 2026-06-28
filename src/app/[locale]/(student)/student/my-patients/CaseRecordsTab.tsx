"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Sparkles, Image as ImageIcon, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// استدعاء الكومبوننت اللي بنيناه قبل كده! (تأكد من مساره عندك)
import { XRayDialog, AIAnalysisData } from "../../../../_components/x-rayDialog"; 

interface CaseRecordsTabProps {
  description: string;
  images: string[]; // مسارات الصور اللي راجعة من الباك إيند
  aiData: AIAnalysisData | null; // داتا الـ AI اللي راجعة من الباك إيند
}

export default function CaseRecordsTab({ description, images, aiData }: CaseRecordsTabProps) {
  const t = useTranslations("CaseDetails.recordsTab");
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* ── 1. وصف المريض ── */}
      <div className="bg-bg-main/50 rounded-2xl p-5 border border-border-light">
        <h4 className="flex items-center gap-2 text-primary font-bold mb-3">
          <AlignRight className="w-5 h-5" />
          {t("patientDesc")}
        </h4>
        <p className="text-text-body leading-relaxed font-medium text-sm">
          {description || "لا يوجد وصف."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── 2. معرض الصور والأشعة ── */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="flex items-center gap-2 text-text-title font-bold">
            <ImageIcon className="w-5 h-5 text-primary" />
            {t("uploadedImages")}
          </h4>
          
          {images && images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-border-light shadow-sm group">
                  <Image 
                    src={img} 
                    alt={`case-image-${idx}`} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-bg-main flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-border-main text-text-muted text-sm font-medium">
              <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
              {t("noImages")}
            </div>
          )}
        </div>

        {/* ── 3. تقرير الذكاء الاصطناعي ── */}
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 text-text-title font-bold">
            <Sparkles className="w-5 h-5 text-[#BF156C]" />
            {t("aiReportTitle")}
          </h4>
          
          <div className="bg-gradient-to-br from-primary/5 to-[#BF156C]/5 border border-primary/10 p-5 rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-[#BF156C]" />
            </div>
            <p className="text-sm text-text-body font-medium mb-5">
              {t("aiReportDesc")}
            </p>
            <Button 
              onClick={() => setIsAiDialogOpen(true)}
              className="w-full bg-[#BF156C] hover:bg-[#A0105A] text-white rounded-xl font-bold shadow-md shadow-[#BF156C]/20"
            >
              {t("viewAiReportBtn")}
            </Button>
          </div>
        </div>

      </div>

      {/* ── استدعاء دايالوج الـ AI اللي عملناه قبل كده ── */}
      {/* هنمرر ليه أول صورة في المصفوفة، وداتا الـ AI */}
      <XRayDialog 
        isOpen={isAiDialogOpen} 
        setIsOpen={setIsAiDialogOpen} 
        imageSrc={images} 
        analysisData={aiData} 
      />

    </div>
  );
}