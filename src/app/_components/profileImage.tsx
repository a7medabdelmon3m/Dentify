"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaStar, FaUser, FaUserXmark } from "react-icons/fa6";
import { useTranslations } from "next-intl";

interface ProfileImageProps {
  userName?: string | null; 
  role: string;
  imageUrl?: string | null; 
  rating?: number; 
}

export default function ProfileImage({ userName, role, imageUrl, rating = 4.5 }: ProfileImageProps) {
  const t = useTranslations("profile");
  const isStudent = role === "Student";

  const [imgError, setImgError] = useState(false);

  if (!userName || userName.trim() === "") {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-bg-main rounded-3xl border border-dashed border-border-main h-full text-center min-h-[250px] animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-text-muted mb-4 shadow-inner">
          <FaUserXmark className="w-7 h-7 opacity-60" />
        </div>
        <h3 className="text-base font-bold text-text-title mb-1">
          {t("no_patient.title") || "لا يوجد مريض حالياً"}
        </h3>
        <p className="text-xs text-text-muted font-medium max-w-[200px] leading-relaxed">
          {t("no_patient.description") || "لم يتم تحديد أو قبول مريض لهذه الحالة بعد."}
        </p>
      </div>
    );
  }

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-3xl border border-primary/10 h-full animate-in fade-in duration-300">
      <div className="relative">
        <div className="relative overflow-hidden rounded-full w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-md bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl md:text-5xl">
          {imageUrl && !imgError ? (
            <Image 
              src={imageUrl} 
              alt="Profile" 
              className="object-cover" 
              fill 
              onError={() => setImgError(true)} 
            />
          ) : firstLetter ? (
            <span>{firstLetter}</span> 
          ) : (
            <FaUser className="w-12 h-12 opacity-50" /> 
          )}
        </div>
      </div>

      <h2 className="mt-5 text-2xl font-bold text-text-title text-center font-heading">
        {userName}
      </h2>
      
      {role && (
        <p className="mt-1 font-bold text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
          {t(`basic_info.${role}`)}
        </p>
      )}

      {isStudent && (
        <div className="flex items-center gap-1 mt-3 bg-white px-3 py-1.5 rounded-xl border border-border-light shadow-sm">
          <FaStar className="w-4 h-4 text-warning" />
          <span className="text-sm font-bold text-text-title">{rating} / 5.0</span>
        </div>
      )}
    </div>
  );
}