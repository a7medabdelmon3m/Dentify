"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { dynamicApiAction } from "../patient.actions"; // عدل المسار حسب مكان الكومبوننت
import Rating from "@/app/_components/Rateing";

export default function FinishCaseButton({ requestId }: { requestId: string }) {
  const t = useTranslations("Rating.confirmAction");
  const [showRating, setShowRating] = useState(false)

  const handleFinish = async () => {
    const result = await Swal.fire({
      title: t("title"),
      text: t("text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e", // لون النجاح (Success)
      cancelButtonColor: "#ef4444", // لون الخطر (Danger)
      confirmButtonText: t("confirm"),
      cancelButtonText: t("cancel"),
      customClass: {
        popup: "rounded-3xl", // عشان يتماشى مع الستايل بتاعك
      },
    });

    if (result.isConfirmed) {
    // هنا نداء الـ API
    //   const response = await dynamicApiAction('Cases/finish', 'POST', requestId);

    //   if (response.success) {
    //     Swal.fire(t("successTitle"), t("successText"), "success");
    //   } else {
    //     Swal.fire("Error!", "Something went wrong.", "error");
    //   }
    setShowRating(true)
    }
  };

  return (
    <>
      <Button
        onClick={handleFinish}
        className="bg-danger hover:bg-danger/90 text-white font-bold rounded-xl"
      >
        إنهاء الحالة
      </Button>
      <Rating requestId={requestId} isOpen={showRating} 
        setIsOpen={setShowRating} />
    </>
  );
}
