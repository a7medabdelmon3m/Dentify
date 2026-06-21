"use client";

import Image from "next/image";

import React from "react";

import me from "@/assets/images/patient.jpg";

// استيراد النجوم بالثلاث حالات

import { FaLocationDot, FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

import { useTranslations } from "next-intl";

import Link from "next/link";

import { proposalType } from "@/type";



export default function ProposalCard({ proposal }: { proposal: proposalType }) {

  const t = useTranslations("proposal.secondary_card");

  const g = useTranslations("governorates");



  // دالة حساب ورسم النجوم

  const renderStars = (rating: number) => {

    const fullStars = Math.floor(rating); // العدد الصحيح للنجوم

    const fraction = rating - fullStars; // الكسر العشري

    const hasHalfStar = fraction >= 0.5; // لو الكسر 0.5 أو أكتر، يبقى فيه نص نجمة

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // الباقي نجوم فاضية



    return (

      <div className="flex items-center gap-0.5 text-warning">

        {/* رسم النجوم الكاملة */}

        {[...Array(fullStars)].map((_, i) => (

          <FaStar key={`full-${i}`} className="w-4 h-4" />

        ))}

       

        {/* رسم النص نجمة لو موجودة */}

        {hasHalfStar && <FaStarHalfStroke className="w-4 h-4" />}

       

        {/* رسم النجوم الفاضية */}

        {[...Array(emptyStars > 0 ? emptyStars : 0)].map((_, i) => (

          <FaRegStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />

        ))}

      </div>

    );

  };



  return (

    <div className="rounded-xl border border-border-light bg-white p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300 relative">

     

      {/* شارة الحالة (Status Badge) */}

      <span className="absolute top-4 right-4 bg-primary-subtle text-primary text-[10px] font-bold px-2 py-1 rounded-full z-10">

        { t(`status.${proposal.status}`)}

      </span>



      {/* Header: Avatar */}

      <div className="flex flex-col items-center gap-3">

        <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2">

          <Image

            fill

            className="object-cover"

            src={proposal.studentProfileImageUrl || me}

            alt={proposal.studentName || t("fallback.doctorName")}

          />

        </div>

      </div>



      {/* Body: Info */}

      <div className="flex flex-col items-center gap-1.5 text-center">

        <h3 className="text-text-title font-bold font-heading text-lg leading-tight line-clamp-1">

          {proposal.studentName || t("fallback.doctorName")}

        </h3>

       

        <div className="flex items-center gap-1 text-text-muted text-sm font-medium">

          <FaLocationDot className="w-3.5 h-3.5" />

          <span className="line-clamp-1">

            {proposal.studentCity ? g(proposal.studentCity) : t("fallback.city")}

          </span>

        </div>



        {/* Ratings Section with dynamic stars */}

        <div className="flex items-center gap-2 mt-1">

          {2.7 > 0 ? (

            <>

              {/* استدعاء دالة رسم النجوم */}

              {renderStars(2.7)}

             

              {/* عرض الرقم والتقييمات */}

              <span className="text-sm font-bold text-text-title">

                {proposal.averageRating}

              </span>

              <span className="text-xs text-text-muted">

                ({proposal.totalRatings})

              </span>

            </>

          ) : (

            <div className="flex items-center gap-1 text-text-muted">

              <FaStar className="w-4 h-4 text-gray-300" />

              <span className="text-sm font-bold">{t("ratings.new")}</span>

            </div>

          )}

        </div>

      </div>



      {/* Action */}

      <Link href={`/patient/proposals/${proposal.id}`} className="mt-2 w-full">

        <Button className="w-full rounded-xl bg-primary hover:bg-primary-hover text-white py-2 font-semibold transition-colors duration-200">

          {t("actions.view_details")}

        </Button>

      </Link>

    </div>

  );

}