"use client";
import CreateCaseForm from "@/app/[locale]/(patient)/patient/create-case/createCaseForm/CreateCaseForm";
import React, { useState } from "react";
import xRay from "@/assets/images/dental-x-rays.png";
import { XRayDialog } from "@/app/_components/x-rayDialog";

export default function CreateCaseContainer() {
  const [isOpen, setIsOpen] = useState(false);

  function handleDialogOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="">
      <CreateCaseForm handleDialogOpen={handleDialogOpen} />

      <XRayDialog
        imageSrc={[xRay.src]}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
