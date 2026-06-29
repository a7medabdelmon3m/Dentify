"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Plus, Trash2, Calendar, MapPin } from "lucide-react";
import { getAppointmentSchema, ProposeAppointmentFormType } from "./appointment.schema";
// import { CreateAppointment } from "../../student.action"; // مسارك حسب المشروع
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatmentRequestId: number;
}

export default function BookAppointmentModal({ isOpen, onClose, treatmentRequestId }: BookAppointmentModalProps) {
  const t = useTranslations("proposeAppointment");

  const {
    control, register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<ProposeAppointmentFormType>({
    resolver: zodResolver(getAppointmentSchema(t)),
    defaultValues: {
      treatmentRequestId: treatmentRequestId,
      slots: [{ appointmentDate: "", location: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "slots" });

  const onSubmit = async (data: ProposeAppointmentFormType) => {
    const formattedData = {
      ...data,
      slots: data.slots.map((slot) => ({
        ...slot,
        appointmentDate: new Date(slot.appointmentDate).toISOString(),
      })),
    };

    // افترضنا هنا إن الـ API call حصل
    // const response = await CreateAppointment(data);
    
    // محاكاة للنجاح
    toast.success(t("toast.successMessage"), { position: "top-center", autoClose: 3000 });
    console.log("Submitting Validated Data:", formattedData);
    
    onClose(); // نقفل المودال بعد النجاح
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* استخدمنا max-w-2xl عشان ياخد مساحة كويسة للفورم، و max-h-[90vh] عشان السكرول */}
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
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-text-title">{t("slotsTitle")}</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ appointmentDate: "", location: "" })}
                className="flex items-center gap-2 border-border-light text-text-body hover:bg-white"
              >
                <Plus className="w-4 h-4" /> {t("addSlotBtn")}
              </Button>
            </div>

            {errors.slots?.root?.message && (
              <p className="text-danger text-sm font-bold px-2">{errors.slots.root.message}</p>
            )}

            {fields.map((item, index) => (
              <div key={item.id} className="bg-white border border-border-light rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-text-title">{t("slotNumber")} {index + 1}</span>
                  {fields.length > 1 && (
                    <Button
                      type="button" variant="ghost" size="sm"
                      onClick={() => remove(index)}
                      className="text-danger hover:bg-danger/10 hover:text-danger h-8 px-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-rightAr">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-title flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> {t("dateLabel")}
                    </label>
                    <Input
                      type="datetime-local"
                      {...register(`slots.${index}.appointmentDate` as const)}
                      className={`w-full border rounded-xl py-6 px-4 bg-bg-main shadow-none focus-visible:ring-primary ${errors.slots?.[index]?.appointmentDate ? "border-danger" : "border-border-light"}`}
                    />
                    {errors.slots?.[index]?.appointmentDate && (
                      <p className="text-danger text-xs font-bold">{errors.slots[index]?.appointmentDate?.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-title flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" /> {t("locationLabel")}
                    </label>
                    <Input
                      type="text"
                      placeholder={t("locationPlaceholder")}
                      {...register(`slots.${index}.location` as const)}
                      className={`w-full border rounded-xl py-6 px-4 bg-bg-main shadow-none focus-visible:ring-primary ${errors.slots?.[index]?.location ? "border-danger" : "border-border-light"}`}
                    />
                    {errors.slots?.[index]?.location && (
                      <p className="text-danger text-xs font-bold">{errors.slots[index]?.location?.message}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl py-6 font-bold text-lg">
            {isSubmitting ? t("submittingBtn") : t("submitBtn")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}