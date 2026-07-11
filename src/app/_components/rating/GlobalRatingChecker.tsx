"use client";

import React, { useState, useEffect } from "react";
import { isAfter, addHours } from "date-fns";
import MandatoryRatingModal from "./MandatoryRatingModal";

export default function GlobalRatingChecker({ pendingRatingSession }: { pendingRatingSession: any | null }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pendingRatingSession) {
      const appointmentDate = new Date(pendingRatingSession.appointmentDate);
      
      const eligibilityDate = addHours(appointmentDate, 0);
      
      if (isAfter(new Date(), eligibilityDate)) {
        setIsOpen(true);
      }
    }
  }, [pendingRatingSession]);

  if (!pendingRatingSession || !isOpen) return null;

  return (
    <MandatoryRatingModal
      isOpen={isOpen}
      onSuccess={() => setIsOpen(false)}
      treatmentRequestId={pendingRatingSession.treatmentRequestId}
      studentName={pendingRatingSession.studentName}
      appointmentDate={pendingRatingSession.appointmentDate}
    />
  );
}