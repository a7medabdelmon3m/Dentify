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
import { egyptGovernorates } from "../../../../../constants/locations";
import { dentalDiseases } from "../../../../../constants/diseases";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaseSchema } from "./createCaseSchema";
import * as z from "zod";
import { createCase } from "./createCase.action";
import { toast } from "react-toastify";
import { AlertCircle, UploadCloud, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const { control, formState, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      requiredSpecialization: "",
      description: "",
      city: "",
      images: [] as File[], 
    },
    resolver: zodResolver(CaseSchema(t)),
  });

  const { isSubmitting, errors } = formState;
  const currentImages = watch("images") || [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalImages = [...currentImages, ...newFiles].slice(0, 5); // حد أقصى 5 صور
      setValue("images", totalImages, { shouldValidate: true });
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = currentImages.filter((_, idx) => idx !== indexToRemove);
    setValue("images", updatedImages, { shouldValidate: true });
  };

  async function mySubmit(data: createCaseType) {
    const formData = new FormData();

    if (data.requiredSpecialization) {
      formData.append("RequiredSpecialization", data.requiredSpecialization.toString());
    }
    if (data.description) formData.append("Description", data.description);
    if (data.city) formData.append("City", data.city);
    
    if (data.images && data.images.length > 0) {
      data.images.forEach((file: File) => {
        formData.append("Images", file); 
      });
    }

    const response = await createCase(formData);

    if (response.success) {
      toast.success("تم إضافة الحالة بنجاح!");
      reset();
    } else {
      setisError(true);
      setTimeout(() => setisError(false), 5000);
    }
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {isError && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} 
          className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl shadow-sm">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <h5 className="font-heading font-bold text-sm text-red-900">{t(`submitError.title`)}</h5>
            <p className="text-xs text-red-700 font-medium leading-relaxed">{t(`submitError.description`)}</p>
          </div>
        </motion.div>
      )}

      <form className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-start" onSubmit={handleSubmit(mySubmit)}>
        
        {/* ── الجزء الأول: تفاصيل الحالة (يمين) ── */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border-light space-y-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl text-text-title font-extrabold font-heading mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              {t("title")}
            </h3>

            <div className="space-y-6">
              <Controller
                name="requiredSpecialization"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Select onValueChange={field.onChange} value={field.value?.toString()}>
                      <SelectTrigger className="w-full border-2 border-border-main hover:border-primary/50 focus:border-primary rounded-2xl py-6 px-5 transition-colors bg-bg-main shadow-inner">
                        <SelectValue placeholder={t("casePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent className="bg-white max-h-75 rounded-2xl">
                        {dentalDiseases.map((item) => (
                          <SelectItem key={item.value} value={item.value.toString()} className="font-medium">
                            {d(item.label)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              <Controller
                name="city"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <SelectTrigger className="w-full border-2 border-border-main hover:border-primary/50 focus:border-primary rounded-2xl py-6 px-5 transition-colors bg-bg-main shadow-inner">
                        <SelectValue placeholder={t("cityPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent className="bg-white max-h-75 rounded-2xl">
                        {egyptGovernorates.map((gov) => (
                          <SelectItem key={gov.value} value={gov.value} className="font-medium">
                            {g(gov.value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && <p className="text-red-500 text-xs px-2 font-bold">{fieldState.error.message}</p>}
                  </div>
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex flex-col gap-2">
                    <Textarea
                      className="border-2 border-border-main hover:border-primary/50 focus:border-primary rounded-2xl p-5 min-h-[160px] transition-colors bg-bg-main shadow-inner resize-none font-medium"
                      {...field}
                      placeholder={t("descPlaceholder")}
                    />
                    {fieldState.error && <FieldError className="text-red-600 font-bold px-2" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </div>
        </div>

        {/* ── الجزء الثاني: الميديا والصور والذكاء الاصطناعي (يسار) ── */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border-light flex flex-col gap-6">
          <h3 className="text-xl text-text-title font-extrabold font-heading flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              {t("xrayTitle")}
            </span>
            <span className="text-danger bg-danger/10 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              {t("mandatory")}
            </span>
          </h3>

          <div className="flex flex-col gap-4">
            {/* منطقة الرفع */}
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-primary/40 rounded-3xl cursor-pointer bg-primary/5 hover:bg-primary/10 transition-all duration-300 group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-primary font-bold mb-1">{t("uploadBtnText")}</p>
                <p className="text-xs text-text-muted font-medium px-4">{t("uploadSubText")}</p>
              </div>
              <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageUpload} />
            </label>

            {errors.images && (
              <p className="text-red-500 text-xs px-2 font-bold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.images.message}
              </p>
            )}

            {/* ── التعديل هنا: شبكة معاينة الصور بقت Thumbnails صغيرة ── */}
            <AnimatePresence>
              {currentImages.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  className="flex flex-wrap gap-3"
                >
                  {currentImages.map((file, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ scale: 0.8, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }} 
                      exit={{ scale: 0.8, opacity: 0 }}
                      // تحكمنا في الحجم هنا (w-16 h-16 للموبايل و w-20 h-20 للديسكتوب)
                      className="relative group w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 border-2 border-border-light shadow-sm"
                    >
                      <Image src={URL.createObjectURL(file)} fill className="object-cover" alt={`preview-${idx}`} />
                      {/* زرار المسح */}
                      <button 
                        type="button" 
                        onClick={() => removeImage(idx)}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <div className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 hover:scale-110 transition-transform">
                          <X className="w-4 h-4" />
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto pt-6 space-y-3">
            {/* زرار الذكاء الاصطناعي بيظهر بس لو فيه صور */}
            <AnimatePresence>
              {currentImages.length > 0 && !isModel && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Button type="button" onClick={handleDialogOpen}
                    className="w-full py-6 bg-[#BF156C] hover:bg-[#A0105A] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#BF156C]/25 transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    {t("analysisBtn")}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <Button type="submit" disabled={isSubmitting}
              className="bg-primary hover:bg-primary-hover text-white w-full rounded-2xl py-6 font-bold text-base shadow-lg shadow-primary/25 transition-all"
            >
              {isSubmitting ? t("submitBtn_loading") : t("submitBtn")}
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}