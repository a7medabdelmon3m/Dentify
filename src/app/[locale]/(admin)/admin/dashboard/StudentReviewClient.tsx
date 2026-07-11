"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Mail, Phone, MapPin, Stethoscope, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmptyState from "@/app/_components/EmptyState";
import { toast } from "react-toastify";
import { RegisterFormValues } from "@/type";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions";

export default function StudentReviewClient({ initialStudents }: { initialStudents: RegisterFormValues[] }) {
  const t = useTranslations("AdminStudentReview");
  const [students, setStudents] = useState<RegisterFormValues[]>(initialStudents);
  
  const handleApprove = async (id: number) => {
    await dynamicApiAction(`http://localhost:5123/api/Admin/students/${id}/approve`, "POST", undefined, undefined);
    
    setStudents(students.filter((s) => s.id !== id));
    toast.success(t("toast.approved"));
  };

  const handleReject = async (id: number) => {
    await dynamicApiAction(`http://localhost:5123/api/Admin/students/${id}/reject`, "POST", undefined, undefined);
    
    setStudents(students.filter((s) => s.id !== id));
    toast.error(t("toast.rejected"));
  };

  return (
    <div className="mt-8">
      <AnimatePresence mode="popLayout">
        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <motion.div
                key={student.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="bg-white border border-border-light rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex items-start gap-4 mb-5 border-b border-border-light pb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-text-title line-clamp-1">
                      {student.fullName}
                    </h3>
                    <p className="text-xs font-bold text-warning bg-warning/10 px-2 py-1 rounded-md w-fit mt-1">
                      قيد المراجعة
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6 flex-1 text-sm font-medium">
                  <div className="flex items-center gap-3 text-text-body">
                    <Mail className="w-4 h-4 text-text-muted shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-text-muted uppercase">{t("card.uniEmail")}</span>
                      <span className="truncate max-w-[200px]" dir="ltr">{student.uniEmail}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-text-body">
                    <Mail className="w-4 h-4 text-text-muted shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-text-muted uppercase">{t("card.personalEmail")}</span>
                      <span className="truncate max-w-[200px]" dir="ltr">{student.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-text-body">
                    <Phone className="w-4 h-4 text-text-muted shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-text-muted uppercase">{t("card.phone")}</span>
                      <span dir="ltr">{student.phoneNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-text-body">
                    <MapPin className="w-4 h-4 text-text-muted shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-text-muted uppercase">{t("card.city")}</span>
                      <span>{student.city}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-text-body">
                    <Stethoscope className="w-4 h-4 text-text-muted shrink-0 mt-1" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-text-muted uppercase">{t("card.specializations")}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {student.specializations.map((spec, idx) => (
                          <span key={idx} className="bg-bg-main border border-border-light text-xs px-2 py-0.5 rounded-md text-text-title">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* الأكشنز */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <Button 
                    onClick={() => handleApprove(student.id)}
                    className="bg-success hover:bg-success/90 text-white font-bold rounded-xl h-11"
                  >
                    <Check className="w-4 h-4 rtl:ml-2 ltr:mr-2" /> {t("card.approveBtn")}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleReject(student.id)}
                    className="border-danger/30 text-danger hover:bg-danger/10 hover:text-danger font-bold rounded-xl h-11"
                  >
                    <X className="w-4 h-4 rtl:ml-2 ltr:mr-2" /> {t("card.rejectBtn")}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <EmptyState 
              icon={<Check className="w-12 h-12 text-success" />}
              title={t("emptyState.title")}
              description={t("emptyState.desc")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}