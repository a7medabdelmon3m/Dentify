"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl"; // تأكد من اسم المكتبة عندك
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

interface XRayDialogProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  imageSrc?: any;
  analysisText?: string;
}

export function XRayDialog({
  isOpen,
  setIsOpen,
  imageSrc,
  analysisText,
}: XRayDialogProps) {
  const t = useTranslations("CreateCase.XRayDialog");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!imageSrc) {
      setPreviewUrl(null);
      return;
    }

    // إذا كان الملف جاي من Input File
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
      <DialogContent className="sm:max-w-2xl bg-bg-card border-border-light rounded-xl gap-0 p-6 overflow-hidden">
        <DialogHeader className="pb-6 border-b border-border-light">
          <DialogTitle className="text-2xl font-bold text-text-title font-heading flex items-center gap-3">
            <div className="bg-primary-subtle p-2 rounded-lg">
              <FaXRay className="text-primary" />
            </div>
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-text-muted">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4 py-6 bg-bg-main">
          <div className="flex flex-col gap-6">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-bg-card border border-border-light shadow-sm">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="X-ray"
                  fill
                  sizes="128px" // إضافة الـ sizes لحل مشكلة التحذير
                  className="object-contain p-2"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-text-muted text-xs">
                  {t("noImage")}
                </div>
              )}
            </div>

            <div className="text-text-body font-sans leading-loose whitespace-pre-line">
              {analysisText || t("defaultAnalysis")}
            </div>
          </div>
        </div>

        <DialogFooter className="pt-6 border-t border-border-light">
          <DialogClose asChild>
            <Button className="bg-primary text-white hover:bg-primary-hover rounded-xl px-8 font-bold">
              {t("close")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
