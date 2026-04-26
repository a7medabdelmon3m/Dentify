"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaXRay } from "react-icons/fa";
import { egyptGovernorates } from "../constants/locations";
import { dentalCases } from "../constants/diseases";

export default function CreateCaseForm({
  handleDialogOpen,
  isModel = false,
}: {
  handleDialogOpen?: () => void;
  isModel?: boolean;
}) {
  const { control, formState, watch } = useForm();
  
  const t = useTranslations("CreateCase");
  const g = useTranslations("governorates");
  const d = useTranslations("CreateCase.dentalCases");

  const xRayFile = watch("xRay");

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
      {/* البيانات الأساسية */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-10">
        <h3 className="text-text-title font-bold font-heading">{t("title")}</h3>

        <Controller
          name="fullName"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-2">
              <Input
                className="border h-auto border-border-main rounded-2xl py-3 px-8 shadow-[0px_20px_50px_0px_#BF156C0D] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                {...field}
                placeholder={t("patientNamePlaceholder")}
              />
              {fieldState.invalid && (
                <FieldError className="text-red-700" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-2">
              <Input
                className="border border-border-main h-auto rounded-2xl py-3 px-8 shadow-[0px_20px_50px_0px_#BF156C0D] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                {...field}
                placeholder={t("phonePlaceholder")}
              />
              {fieldState.invalid && (
                <FieldError className="text-red-700" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* اختيار المحافظة */}
        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="space-y-2">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full h-auto! data-placeholder:text-gray-500 border border-border-main rounded-2xl py-3 px-8 shadow-[0px_20px_50px_0px_#BF156C0D]">
                  <SelectValue placeholder={t("cityPlaceholder")} />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-[300px]">
                  {egyptGovernorates.map((gov) => (
                    <SelectItem key={gov.value} value={gov.value}>
                      {g(gov.value)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />

        {/* اختيار الحالة المرضية */}
        <Controller
          name="dentalCase"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="space-y-2">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full h-auto! data-placeholder:text-gray-500 border border-border-main rounded-2xl py-3 px-8 shadow-[0px_20px_50px_0px_#BF156C0D]">
                  <SelectValue placeholder={t("casePlaceholder")} />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-[300px]">
                  {dentalCases.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {d(item.value)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formState.errors.dentalCase && (
                <p className="text-red-500 text-xs px-2">{t("caseError")}</p>
              )}
            </div>
          )}
        />

        <Button type="button" className="bg-primary hover:bg-primary-hover text-white w-full rounded-2xl py-3 h-auto font-bold">
          {t("submitBtn")}
        </Button>
      </div>
      
      {/* قسم الأشعة والتحليل */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-10 flex flex-col justify-between">
        <h3 className="text-text-title font-bold font-heading">
          {t("xrayTitle")}{" "}
          <span className="font-medium text-gray-500 text-sm">{t("optional")}</span>
        </h3>

        <div className="relative rounded-xl overflow-hidden w-full bg-gray-100 h-75 flex items-center justify-center text-5xl text-gray-500 border-2 border-dashed border-gray-200">
          {xRayFile && xRayFile[0] ? (
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-contain p-2"
              src={URL.createObjectURL(xRayFile[0])}
              alt="x-ray preview"
            />
          ) : (
            <FaXRay className="opacity-20 text-5xl text-gray-400" />
          )}
        </div>

        <Controller
          name="xRay"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col gap-4">
              <label className="flex justify-center cursor-pointer" htmlFor="xRay">
                {!value || value.length === 0 || isModel ? (
                  <div className="border h-auto border-border-main rounded-2xl py-3 px-16 shadow-[0px_20px_50px_0px_#BF156C0D] bg-primary hover:bg-primary-hover text-white font-bold transition-all">
                    {t("uploadBtn")}
                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={handleDialogOpen}
                    className="w-full py-3 bg-[#BF156C] text-white rounded-2xl font-bold shadow-lg hover:bg-[#BF156C]/90 h-auto"
                  >
                    {t("analysisBtn")}
                  </Button>
                )}
              </label>

              <input id="xRay" type="file" className="hidden" accept="image/*" onChange={(e) => onChange(e.target.files)} />

              {value && value.length > 0 && (
                <label htmlFor="xRay" className="text-center text-sm text-gray-500 underline cursor-pointer hover:text-primary">
                  {t("changePhoto")}
                </label>
              )}
            </div>
          )}
        />
      </div>
    </form>
  );
}