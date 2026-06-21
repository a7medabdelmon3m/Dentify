"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaXRay } from "react-icons/fa";
import { egyptGovernorates } from "../../../../../constants/locations";
import { dentalDiseases } from "../../../../../constants/diseases";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaseSchema } from "./createCaseSchema";

import * as z from "zod";
import { createCase } from "./createCase.action";
import { toast } from "react-toastify";
import { AlertCircle } from "lucide-react";

export type createCaseType = z.infer<ReturnType<typeof CaseSchema>>;

export default function CreateCaseForm({
  handleDialogOpen,
  isModel = false,
}: {
  handleDialogOpen?: () => void;
  isModel?: boolean;
}) {
  const t = useTranslations("CreateCase");
  const g = useTranslations("governorates");
  const d = useTranslations("CreateCase.diseases");
  const [isError, setisError] = useState(false);

  // 1. استدعاء دالة reset من هنا
  const { control, formState, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      requiredSpecialization: "",
      description: "",
      city: "",
      image: null,
    },
    resolver: zodResolver(CaseSchema(t)),
  });

  const { isSubmitting, errors } = formState;
  const imageFile = watch("image");

  async function mySubmit(data: createCaseType) {
    const formData = new FormData();

    if (data.requiredSpecialization) {
      formData.append(
        "RequiredSpecialization",
        data.requiredSpecialization.toString(),
      );
    }
    if (data.description) {
      formData.append("Description", data.description);
    }
    if (data.city) {
      formData.append("City", data.city);
    }
    if (data.image && data.image[0]) {
      formData.append("Image", data.image[0]); // ده ملف الصورة
    }

    const response = await createCase(formData);

    console.log('response : ' , response);
    
    if (response.success) {
      toast.success("case is created successfully");
      
      // 2. تفريغ الفورمة بالكامل بعد النجاح
      reset(); 
      
    } else {
      setisError(true);
      setTimeout(() => {
        setisError(false);
      }, 5000);
    }
  }
    
  return (
    <div className="container mx-auto max-w-4xl">
      {isError && 
        <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Error Icon */}
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />

          <div className="flex-1 space-y-1">
            <h5 className="font-heading font-bold text-sm text-red-900">
              {t(`submitError.title`)}
            </h5>
            <p className="text-xs text-red-700 font-medium leading-relaxed">
             {t(`submitError.description`)}
            </p>
          </div>
        </div>
      }
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start"
          onSubmit={handleSubmit(mySubmit)}
        >
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-10">
            <h3 className="text-text-title font-bold font-heading">
              {t("title")}
            </h3>

            <Controller
              name="requiredSpecialization"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="w-full border border-border-main rounded-2xl py-3 px-8 shadow-sm">
                      <SelectValue placeholder={t("casePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-75">
                      {dentalDiseases.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value.toString()}
                        >
                          {d(item.label)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.requiredSpecialization && (
                    <p className="text-red-500 text-xs px-2">
                      {errors.requiredSpecialization.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-2"
                >
                  <Textarea
                    className="border border-border-main rounded-2xl py-3 px-8 min-h-30"
                    {...field}
                    placeholder={t("descPlaceholder")}
                  />
                  {fieldState.error && (
                    <FieldError
                      className="text-red-700"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="city"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="w-full border border-border-main rounded-2xl py-3 px-8 shadow-sm">
                      <SelectValue placeholder={t("cityPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-75">
                      {egyptGovernorates.map((gov) => (
                        <SelectItem key={gov.value} value={gov.value}>
                          {g(gov.value)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p className="text-red-500 text-xs px-2">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary-hover text-white w-full rounded-2xl py-3 font-bold"
            >
              {isSubmitting ? t("submitBtn_loading") : t("submitBtn")}
            </Button>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm space-y-10 flex flex-col justify-between">
            <h3 className="text-text-title font-bold font-heading">
              {t("xrayTitle")}{" "}
              <span className="font-medium text-gray-500 text-sm">
                {t("optional")}
              </span>
            </h3>

            <div className="relative rounded-xl overflow-hidden w-full bg-gray-100 h-75 flex items-center justify-center border-2 border-dashed border-gray-200">
              {imageFile && imageFile[0] ? (
                <Image
                  fill
                  className="object-contain p-2"
                  src={URL.createObjectURL(imageFile[0])}
                  alt="x-ray preview"
                />
              ) : (
                <FaXRay className="opacity-20 text-5xl text-gray-400" />
              )}
            </div>

            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col gap-4">
                  <label
                    className="flex justify-center cursor-pointer"
                    htmlFor="xRay"
                  >
                    {!value || value.length === 0 || isModel ? (
                      <div className="border border-border-main rounded-2xl py-3 px-16 bg-primary text-white font-bold">
                        {t("uploadBtn")}
                      </div>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleDialogOpen}
                        className="w-full py-3 bg-[#BF156C] text-white rounded-2xl font-bold"
                      >
                        {t("analysisBtn")}
                      </Button>
                    )}
                  </label>
                  <input
                    id="xRay"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => onChange(e.target.files)}
                  />
                </div>
              )}
            />
          </div>
        </form>
      
    </div>
  );
}