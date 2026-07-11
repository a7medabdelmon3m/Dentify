import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { User, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CurrentPatientCard({myPatient} :{myPatient:{patientName:string , city:string , caseDescription:string}}) {
  const t = await getTranslations("student_dashboard");
  const locale = await getLocale();
  const isArabic = locale === "ar";
console.log('myPatient : ' , myPatient);

  

  return (
    <div className="bg-white rounded-3xl border border-border-light shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shrink-0">
          <User className="h-6 w-6" />
        </div>
        <h3 className="font-heading text-lg font-bold text-text-title">
          {t("myPatient")}
        </h3>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {myPatient.patientName !== '' ? (
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-text-title text-lg">{myPatient.patientName}</h4>
              <p className="text-xs text-text-muted font-bold mt-1 uppercase">
                {t("patientComplaint")}
              </p>
              <p className="text-sm font-medium text-text-body line-clamp-2 mt-0.5 leading-relaxed">
                {myPatient.caseDescription}
              </p>
            </div>
            
            <Button asChild className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl h-11 shadow-sm mt-auto">
              <Link href="/student/my-patients" className="flex items-center justify-center gap-2">
                {t("viewPatient")}
                {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <p className="font-heading font-bold text-text-title">{t("no_patient.title")}</p>
            <p className="text-sm text-text-muted font-medium">{t("no_patient.description")}</p>
          </div>
        )}
      </div>
    </div>
  );
}