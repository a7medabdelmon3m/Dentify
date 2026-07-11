"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import dynamic from 'next/dynamic';

const BookAppointmentModal = dynamic(
  () => import('@/app/_components/BookAppointmentModal/BookAppointmentModal'), 
  { ssr: false }
);

interface CreateAppointmentButtonProps {
  treatmentRequestId: number;
  isProposeDisabled: boolean; 
}

export default function CreateAppointmentButton({ treatmentRequestId, isProposeDisabled }: CreateAppointmentButtonProps) {
  const t = useTranslations("CaseDetails.appointmentsTab");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    {}
      <Button
        onClick={() => setIsModalOpen(true)}
        disabled={isProposeDisabled}
        className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-md flex items-center gap-2 py-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <CalendarPlus className="w-5 h-5" />
        {t("proposeBtn")}
      </Button>

      <BookAppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        treatmentRequestId={treatmentRequestId} 
      />
    </>
  );
}