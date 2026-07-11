"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Calendar, MapPin } from "lucide-react";
import { getAppointmentSchema, ProposeAppointmentFormType } from "./appointment.schema";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions";

export type appointmentType = {
  id: number;
  caseId: number;
  patientName: string;
  studentName: string;
  location: string;
  status: string;
  appointmentDate: `${string}T${string}Z`;
};

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatmentRequestId: number;
}

export default function BookAppointmentModal({ isOpen, onClose, treatmentRequestId }: BookAppointmentModalProps) {
  const t = useTranslations("proposeAppointment");
  const router = useRouter();

  const {
    register, handleSubmit, formState: { errors, isSubmitting }, reset
  } = useForm<ProposeAppointmentFormType>({
    resolver: zodResolver(getAppointmentSchema(t)),
    defaultValues: {
      treatmentRequestId: treatmentRequestId,
      appointmentDate: "", 
      location: "",
    },
  });

  const onSubmit = async (data: ProposeAppointmentFormType) => {
    try {
      const payload = {
        treatmentRequestId: data.treatmentRequestId,
        appointmentDate: new Date(data.appointmentDate).toISOString(),
        location: data.location,
      };

      const response = await dynamicApiAction<appointmentType>("Appointments/Propose", "POST", undefined, payload);

      if (response?.data || response?.success || response?.data?.id) {
        
        toast.success(t("toast.successMessage") || "تم إرسال الموعد المقترح بنجاح!", { 
          position: "top-center", 
          autoClose: 3000 
        });
        
        reset(); 
        onClose(); 
        
        router.refresh(); 

      } else {
        toast.error((response?.error as string) || "حدث خطأ أثناء تسجيل الموعد.");
      }
    } catch (error) {
      console.error("Error Proposing Appointment:", error);
      toast.error("حدث خطأ في الاتصال بالسيرفر، يرجى المحاولة لاحقاً.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-bg-main p-6 rounded-3xl">
        <DialogHeader className="text-rightAr border-b border-border-light pb-4 mb-4">
          <DialogTitle className="font-heading text-xl text-text-title">
            {t("caseSummaryTitle")}
          </DialogTitle>
          <DialogDescription className="text-text-muted mt-1 font-medium">
            {t("caseSummaryDesc")} #{treatmentRequestId}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-text-title">{t("slotsTitle")}</h4>

            <div className="bg-white border border-border-light rounded-2xl p-5 shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-rightAr">
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-title flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> {t("dateLabel")}
                  </label>
                  <Input
                    type="datetime-local"
                    {...register("appointmentDate")}
                    className={`w-full border rounded-xl py-6 px-4 bg-bg-main shadow-none focus-visible:ring-primary ${errors.appointmentDate ? "border-danger" : "border-border-light"}`}
                  />
                  {errors.appointmentDate && (
                    <p className="text-danger text-xs font-bold">{errors.appointmentDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-title flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> {t("locationLabel")}
                  </label>
                  <Input
                    type="text"
                    placeholder={t("locationPlaceholder")}
                    {...register("location")}
                    className={`w-full border rounded-xl py-6 px-4 bg-bg-main shadow-none focus-visible:ring-primary ${errors.location ? "border-danger" : "border-border-light"}`}
                  />
                  {errors.location && (
                    <p className="text-danger text-xs font-bold">{errors.location.message}</p>
                  )}
                </div>
                
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl py-6 font-bold text-lg">
            {isSubmitting ? "جاري الإرسال..." : t("submitBtn")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}