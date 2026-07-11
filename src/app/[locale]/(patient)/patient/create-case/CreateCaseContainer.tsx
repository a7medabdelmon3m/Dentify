"use client";
import CreateCaseForm from "@/app/[locale]/(patient)/patient/create-case/createCaseForm/CreateCaseForm";
import React, { useState } from "react";
import xRay from "@/assets/images/dental-x-rays.png";
import dynamic from 'next/dynamic';
const TypedCreateCaseForm = CreateCaseForm as React.ComponentType<{
  handleDialogOpen: () => void;
}>;
const XRayDialog = dynamic(
  () => import('@/app/_components/x-rayDialog').then((mod) => mod.XRayDialog), 
  { ssr: false }
);
export default function CreateCaseContainer() {
  const [isOpen, setIsOpen] = useState(false);

  function handleDialogOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="">
      <TypedCreateCaseForm handleDialogOpen={handleDialogOpen} />

      <XRayDialog
        imageSrc={[xRay.src]}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
