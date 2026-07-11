import React from "react";
import { getTranslations } from "next-intl/server";
import { ClipboardList } from "lucide-react";

export default async function TargetedCasesCard({caseType}:{caseType:string[]}) {
  const t = await getTranslations("student_dashboard");
  const d = await getTranslations("number_diseases");
  
  const selectedSpecialties = ["علاج جذور (Endo)", "خلع جراحي (Surgery)", "تنظيف جير (Perio)"];
  
  return (
    <div className="bg-white rounded-3xl border border-border-light shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
          <ClipboardList className="h-6 w-6" />
        </div>
        <h3 className="font-heading text-lg font-bold text-text-title">
          {t("selectedSpecialties")}
        </h3>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        {caseType && caseType.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {caseType.map((spec, index) => (
              <span 
                key={index} 
                className="bg-bg-main border border-border-light text-text-title text-sm font-bold px-4 py-2 rounded-xl"
              >
                {d(String(spec))}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-sm font-medium text-center">
            {t("noSpecialties")}
          </p>
        )}
      </div>
    </div>
  );
}