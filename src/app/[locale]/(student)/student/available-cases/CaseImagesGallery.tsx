"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaImages, FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

export default function CaseImagesGallery({ images }: { images: string[] }) {
  const t = useTranslations("studentCaseDetails");
  // State عشان نعرف إيه الصورة اللي اليوزر داس عليها
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // تم إصلاح قوس القفلة الخاص بالشرط ده
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
            onClick={() => setSelectedImg(src)} // لما يدوس، يخزن مسار الصورة
            className="relative h-32 md:h-40 rounded-2xl overflow-hidden border border-border-light bg-white shadow-sm hover:shadow-md transition-all group cursor-pointer"
          >
            <Image
              src={src}
              alt={`Case Image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay تأثير الهوفر */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* ── مكبر الصور (Lightbox) ── */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)} // يقفل لو داس على الخلفية السودا
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            {/* زرار الإغلاق */}
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-2 rounded-full transition-all z-50"
            >
              <FaXmark className="w-6 h-6" />
              {/* name */}
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              className="relative w-full max-w-4xl aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // عشان لو داس على الصورة نفسها ميفقلش الـ Lightbox
            >
              <Image
                src={selectedImg}
                alt="Zoomed X-Ray"
                fill
                className="object-contain" // object-contain عشان الصورة متتقصش وتتعرض بالكامل
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}