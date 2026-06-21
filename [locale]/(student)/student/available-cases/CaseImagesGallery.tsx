"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaImages } from "react-icons/fa6";

export default function CaseImagesGallery({ images }: { images: string[]  }) {
  const t = useTranslations("studentCaseDetails");

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-dashed border-border-light rounded-3xl bg-bg-main text-text-muted mt-6">
        <FaImages className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-sm font-medium">{t("noImages")}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4 text-rightAr">
      <h3 className="font-heading font-bold text-lg text-text-title flex items-center gap-2">
        <FaImages className="w-5 h-5 text-primary" />
        {t("images")}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div 
            key={index} 
            className="relative h-32 md:h-40 rounded-2xl overflow-hidden border border-border-light bg-white shadow-sm hover:shadow-md transition-shadow group"
          >
            <Image 
              src={src} 
              alt={`Case Image ${index + 1}`} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            {/* Overlay خفيف */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}