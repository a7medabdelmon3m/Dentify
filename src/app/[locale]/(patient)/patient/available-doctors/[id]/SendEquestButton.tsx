"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { dynamicApiAction } from "../../patient.actions";


export default function SendEquestButton({
 studentId
}: {
 studentId :string
}) {
  const t = useTranslations("DoctorInsights");
  const [isLoading, setisLoading] = useState(false);

  async function handleSendRequestToDoctor() {
    const cId = Cookies.get("caseId");
    const fullId = `${studentId}/${cId}`;

    setisLoading(true);
    const response = await dynamicApiAction(
      "TreatmentRequests/patient/send",
      "POST",
      fullId,
      "",
    );
    setisLoading(false);

    if (response.success) {
      toast.success("تم إرسال طلبك بنجاح");
    } else {
      toast.error(String(response.error));
    }
  }

  return (
    <Button
      onClick={handleSendRequestToDoctor}
      disabled={isLoading}
      className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold py-6 px-10 rounded-xl shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed text-base sm:text-lg"
    >
      {isLoading ? t("requestBtn_loading") : t("requestBtn")}
    </Button>
  );
}
