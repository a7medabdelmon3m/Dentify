"use client";

import Image from "next/image";
import React from "react";
import me from "@/assets/images/patient.jpg"; 
import { MapPin, Star } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { proposalType } from "@/type";

export default function ProposalCard({ proposal }: { proposal: proposalType }) {
  const t = useTranslations("proposal.secondary_card");
  const g = useTranslations("governorates");

  return (
    <Link
      href={`/patient/proposals/${proposal.id}`}
      className="block bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4 gap-2">
        
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-50 shadow-sm shrink-0">
            <Image
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              src={proposal.studentProfileImageUrl || me}
              alt={proposal.studentName || t("fallback.doctorName")}
            />
          </div>

          <div className="text-start">
            <h4 className="font-bold text-[#1e293b] text-base line-clamp-1 group-hover:text-primary transition-colors">
              د. {proposal.studentName || t("fallback.doctorName")}
            </h4>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mt-1.5">
              <MapPin className="w-4 h-4 text-primary/70" />
              <span>
                {proposal.studentCity ? g(proposal.studentCity) : t("fallback.city")}
              </span>
            </div>
          </div>
        </div>

        <span className="bg-primary-subtle text-primary text-[10px] font-bold px-3 py-1.5 rounded-full shrink-0 mt-1">
          {t(`status.${proposal.status}`)}
        </span>
      </div>

      <div className="mb-5 flex-1">
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-1 text-start">
          {(proposal as any).proposalText || (proposal as any).text || (proposal as any).description || "تم تقديم عرض لعلاج هذه الحالة، اضغط لمعرفة التفاصيل."}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100/80 mt-auto">
        
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
          <span className="text-sm font-bold text-slate-700">
            {proposal.averageRating > 0 ? proposal.averageRating : t("ratings.new")}
          </span>
          {proposal.totalRatings > 0 && (
            <span className="text-xs text-slate-400 font-medium">
              ({proposal.totalRatings})
            </span>
          )}
        </div>

        <Button
          className="h-9 px-4 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl text-xs font-bold transition-colors"
        >
          {t("actions.view_details")}
        </Button>
      </div>
    </Link>
  );
}