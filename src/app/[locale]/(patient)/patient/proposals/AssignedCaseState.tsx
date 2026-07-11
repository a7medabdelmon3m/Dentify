import React from "react";
import { FaCircleCheck, FaUserDoctor, FaMessage } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AssignedCaseStateProps {
  doctorName?: string; 
  id :string
}

export default function AssignedCaseState({ doctorName ,id }: AssignedCaseStateProps) {
  const t = useTranslations("proposal.assignedState");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 text-center animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex items-center justify-center w-24 h-24 bg-success/10 border-4 border-success/20 rounded-full mb-6 shadow-sm">
        <FaCircleCheck className="w-12 h-12 text-success" />
      </div>

      <div className="max-w-md space-y-3">
        <h3 className="font-heading font-bold text-2xl text-text-title tracking-tight">
          {t("title")}
        </h3>
        <p className="text-base text-text-muted font-medium leading-relaxed">
          {doctorName 
            ? t("descriptionWithDoctor", { name: doctorName }) 
            : t("description")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-sm">
        
        <Button asChild className="h-14 flex-1 rounded-xl bg-primary hover:bg-primary-hover text-white font-heading font-bold shadow-sm transition-all duration-200">
          <Link href={`/patient/dashboard#${id}`}>
            <FaUserDoctor className="ml-2 w-4 h-4" /> 
            {t("goToDashboard")}
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-14 flex-1 rounded-xl border-border-light text-text-title hover:bg-bg-main font-heading font-bold transition-all duration-200">
          <Link href="/patient/chat">
            <FaMessage className="ml-2 w-4 h-4 text-primary" />
            {t("contactDoctor")}
          </Link>
        </Button>

      </div>
    </div>
  );
}