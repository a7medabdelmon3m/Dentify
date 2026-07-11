"use client";

import Image from "next/image";
import React from "react";
import doctorImg from "@/assets/images/Dr. Ahmed.png"; 
import { MapPin, Star, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { availableDoctorsType } from "@/type";

export default function AvailableDoctorCard({ doctor: d }: { doctor: availableDoctorsType }) {
  const t = useTranslations("available-doctors.AvailableDoctorCard");
  const g = useTranslations("governorates");

  const staticBio = "طالب طب أسنان شغوف بتقديم أفضل رعاية طبية للمرضى، مع التركيز على التشخيص الدقيق وعلاج الجذور.";
  const staticRating = 4.8;
  const staticReviewsCount = 14;

  return (
    <Link 
      href={`/patient/available-doctors/${d.id}`} 
      className="block bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-50 shadow-sm shrink-0">
          <Image
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            src={d.profileImageUrl ? d.profileImageUrl : doctorImg}
            alt={d.fullName || "صورة الطبيب"}
          />
        </div>
        
        <div className="flex-1 text-start">
          <h4 className="font-bold text-[#1e293b] text-base line-clamp-1 group-hover:text-primary transition-colors">
            د. {d.fullName}
          </h4>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mt-1.5">
            <GraduationCap className="w-4 h-4 text-primary/70" />
            <span>{g(d.city)}</span> 
          </div>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 text-start">
          {staticBio}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100/80">
        
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
          <span className="text-sm font-bold text-slate-700">{staticRating}</span>
          <span className="text-xs text-slate-400 font-medium">({staticReviewsCount})</span>
        </div>

        <Button 
          className="h-9 px-4 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl text-xs font-bold transition-colors"
        >
          {t("requestButton")}
        </Button>
      </div>
    </Link>
  );
}