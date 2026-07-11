"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { dynamicApiAction } from "../patient.actions";

export default function FinishCaseButton({ requestId }: { requestId: string }) {
  const t = useTranslations("Rating.confirmAction");
  const [showRating, setShowRating] = useState(false)

  const handleFinish = async () => {
    const result = await Swal.fire({
      title: t("title"),
      text: t("text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e", 
      cancelButtonColor: "#ef4444", 
      confirmButtonText: t("confirm"),
      cancelButtonText: t("cancel"),
      customClass: {
        popup: "rounded-3xl", 
      },
    });

    if (result.isConfirmed) {
   
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
      
    </>
  );
}
