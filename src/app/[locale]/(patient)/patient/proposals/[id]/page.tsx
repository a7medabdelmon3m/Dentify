"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import doctor from "@/assets/images/Dr. Ahmed.png";
import { 
  FaBuildingColumns, 
  FaStar, 
  FaStarHalfStroke, 
  FaRegStar, 
  FaClock 
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import PageHeader from "@/app/_components/PageHeader";
import { useLocale, useTranslations } from "next-intl";
import { formatTimeAgo } from "@/lib/utils";
// 1. استيراد useRouter و useParams من next/navigation
import { useParams, useRouter } from "next/navigation"; 
import { dynamicApiAction } from "../../patient.actions";
import { toast } from "react-toastify";

export default function ProposedPage() {
  const t = useTranslations("proposal.card");
  const locale = useLocale(); 
  const { id: requestId } = useParams(); 
  
  // 2. تعريف الـ router
  const router = useRouter(); 
  
  const [isLoading, setisLoading] = useState(false);
  const [mockSubmittedDate, setMockSubmittedDate] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const calculatedDate = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
      setMockSubmittedDate(calculatedDate);
    }, 0);

    return () => clearTimeout(timer);
  }, []);
  
  console.log('requestId : ' , requestId);
  
  async function handleAcceptRequest(){
    setisLoading(true);
    // 3. تعديل مسار الـ API بشيل السلاش الزيادة
    const response = await dynamicApiAction('TreatmentRequests/accept', 'PUT', requestId as string, undefined); 
    setisLoading(false);
    console.log("response : " , response);
    
    if(response.success){
      toast.success('تم قبول العرض بنجاح!');
      // 4. استخدام router.push مع الـ locale عشان التوجيه يكون سليم 100%
      router.push(`/${locale}/patient/chats/${requestId}`); 
    } else {
      toast.error(String(response.error));
    }
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const fraction = rating - fullStars;
    const hasHalfStar = fraction >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5 text-warning text-lg">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfStroke />}
        {[...Array(emptyStars > 0 ? emptyStars : 0)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-gray-300" />
        ))}
      </div>
    );
  };

  const ratingValue = 3.6;

  return (
    <section className="bg-bg-main ">
      <div className="container p-4 mx-auto space-y-6">
        
        <PageHeader 
          title={t("headerTitle")} 
          desc={t("headerDesc")} 
        />
        
        <div className="bg-white shadow-sm border border-border-light rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row gap-6 justify-between items-start pb-8 border-b border-border-light">
            
            <div className="flex gap-4 items-start">
              <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-primary-subtle shadow-sm mt-1">
                <Image
                  src={doctor}
                  alt="Doctor Profile"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              
              <div className="space-y-1.5 text-rightAr">
                <h4 className="font-heading text-text-title font-bold text-2xl tracking-tight">
                  Dr. Ahmed Moneim
                </h4>
                
                <div className="flex gap-2 items-center bg-bg-main px-3 py-1.5 rounded-lg border border-border-light w-fit">
                  <span className="font-extrabold text-text-title text-sm mt-0.5">
                    {ratingValue}
                  </span>
                  {renderStars(ratingValue)}
                  <span className="text-xs text-text-muted font-medium mt-0.5">
                    {t("rating")}
                  </span>
                </div>
                
                <p className="text-sm font-semibold text-primary">
                  {t("specialty")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 font-medium text-text-muted py-1.5 px-4 bg-bg-main border border-border-light rounded-full shadow-sm text-xs self-start">
              <FaClock className="w-3 h-3" />
              <span>{t("submitted")}</span>
              <span>{mockSubmittedDate ? formatTimeAgo(mockSubmittedDate, locale) : "..."}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-text-title text-lg">
              {t("doctorDetails")}
            </h4>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex gap-3 items-center border border-border-light py-2 px-5 bg-bg-main rounded-xl font-medium flex-1 shadow-sm">
                <div className="flex w-10 h-10 shrink-0 rounded-lg justify-center items-center bg-white border border-border-light text-primary">
                  <FaBuildingColumns className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-rightAr">
                  <span className="text-xs text-text-muted">الجامعة التابع لها</span>
                  <span className="text-sm font-bold text-text-title">{t("university")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-primary-subtle/30 border border-primary/10">
            <h4 className="font-heading font-bold text-primary text-lg">
              {t("treatmentProposal")}
            </h4>
            <p className="text-text-body leading-relaxed text-sm sm:text-base text-rightAr">
              &quot;Hello! I have reviewed your case regarding tartar
              accumulation. I can provide a comprehensive professional scaling
              and polishing session at the university hospital. The plan
              includes: Full tartar removal using ultrasonic scalers. Teeth
              polishing to remove surface stains. A personalized oral hygiene
              guide for long-term care. The session will take approx. 60 minutes
              under full faculty supervision to ensure the best results. Looking
              forward to helping you!&quot;
            </p>
          </div>

          <div className="flex gap-4 items-center pt-4">
            <Button onClick={handleAcceptRequest} disabled={isLoading} className="h-14 flex-1 rounded-xl text-base sm:text-lg text-white font-bold bg-success hover:bg-success/90 shadow-sm transition-all border-none">
              { isLoading ? t(`acceptBtn_loading`) : t("acceptBtn")}
            </Button>
            <Button disabled={isLoading} className="h-14 flex-1 rounded-xl text-base sm:text-lg text-danger font-bold bg-danger/10 hover:bg-danger hover:text-white border border-danger/20 shadow-sm transition-all">
              {t("declineBtn")}
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
}