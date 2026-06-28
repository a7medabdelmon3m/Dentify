"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Plus, Trash2, Calendar, MapPin } from "lucide-react";
import {
  getAppointmentSchema,
  ProposeAppointmentFormType,
} from "./appointment.schema";
import { CreateAppointment } from "../../student.action";
import { toast } from "react-toastify";

export default function ProposeAppointment({ treatmentRequestId = 1 }) {
  const t = useTranslations("proposeAppointment");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProposeAppointmentFormType>({
    resolver: zodResolver(getAppointmentSchema(t)),
    defaultValues: {
      treatmentRequestId: treatmentRequestId,
      slots: [{ appointmentDate: "", location: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "slots",
  });

  const onSubmit = async (data: ProposeAppointmentFormType) => {
    const formattedData = {
      ...data,
      slots: data.slots.map((slot) => ({
        ...slot,
        appointmentDate: new Date(slot.appointmentDate).toISOString(),
      })),
    };

    const response = await CreateAppointment(data);

    if (response.success) {
      toast.success(t("toast.successMessage"), {
        position: "top-center", // تقدر تغير المكان براحتك
        autoClose: 3000,
      });
    } else {
      // توست الفشل
      toast.error(t("toast.errorMessage") || response.error, {
        position: "top-center",
        autoClose: 4000,
      });
    }

    console.log("Submitting Validated Data:", formattedData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* جزء الـ Context */}
      <div className="bg-primary-subtle border border-border-light rounded-xl p-5 flex items-center justify-between shadow-sm">
        <div>
          <h3 className="font-heading font-bold text-text-title text-lg">
            {t("caseSummaryTitle")}
          </h3>
          <p className="text-text-muted text-sm mt-1">
            {t("caseSummaryDesc")} #1234
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-text-title">
              {t("slotsTitle")}
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ appointmentDate: "", location: "" })}
              className="flex items-center gap-2 border-border-light text-text-body hover:bg-bg-main"
            >
              <Plus className="w-4 h-4" />
              {t("addSlotBtn")}
            </Button>
          </div>

          {/* لو فيه خطأ يخص الـ Array نفسه */}
          {errors.slots?.root?.message && (
            <p className="text-red-500 text-sm font-semibold px-2">
              {errors.slots.root.message}
            </p>
          )}

          {/* Dynamic Slots */}
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border border-border-light rounded-xl p-5 shadow-sm space-y-4 animate-in fade-in duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-text-title">
                  {t("slotNumber")} {index + 1}
                </span>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-700 h-8 px-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* حقل التاريخ */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-body flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {t("dateLabel")}
                  </label>
                  <Input
                    type="datetime-local"
                    {...register(`slots.${index}.appointmentDate` as const)}
                    className={`w-full border rounded-2xl py-3 px-8 shadow-sm focus-visible:ring-primary ${
                      errors.slots?.[index]?.appointmentDate
                        ? "border-red-500"
                        : "border-border-main"
                    }`}
                  />
                  {/* عرض رسالة الخطأ للتاريخ */}
                  {errors.slots?.[index]?.appointmentDate && (
                    <p className="text-red-500 text-xs px-2">
                      {errors.slots[index]?.appointmentDate?.message}
                    </p>
                  )}
                </div>

                {/* حقل المكان */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-body flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {t("locationLabel")}
                  </label>
                  <Input
                    type="text"
                    placeholder={t("locationPlaceholder")}
                    {...register(`slots.${index}.location` as const)}
                    className={`w-full border rounded-2xl py-3 px-8 shadow-sm focus-visible:ring-primary ${
                      errors.slots?.[index]?.location
                        ? "border-red-500"
                        : "border-border-main"
                    }`}
                  />
                  {/* عرض رسالة الخطأ للمكان */}
                  {errors.slots?.[index]?.location && (
                    <p className="text-red-500 text-xs px-2">
                      {errors.slots[index]?.location?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl py-6 font-bold text-lg transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              </span>
              {t("submittingBtn")} {/* نص جديد للترجمة وقت التحميل */}
            </>
          ) : (
            t("submitBtn")
          )}
        </Button>
      </form>
    </div>
  );
}
