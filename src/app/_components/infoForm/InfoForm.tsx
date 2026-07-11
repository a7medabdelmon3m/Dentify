"use client";

import React, { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions";
import { ChevronDown, Camera, User, Loader2 } from "lucide-react"; 
import { dentalDiseases } from "@/app/constants/diseases";
import Image from "next/image";

export default function InfoForm({ role, defaultData }: { role: string, defaultData?: any }) {
  const t = useTranslations("profile");
  const router = useRouter();
  const isStudent = role === "Student";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(defaultData?.imageProfile || null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const defaultSpecializations = Array.isArray(defaultData?.specializations) 
    ? defaultData.specializations 
    : (typeof defaultData?.specializations === 'string' && defaultData?.specializations !== "")
      ? defaultData.specializations.split(',')
      : [];

  const { control, handleSubmit, formState: { isSubmitting }, reset, setValue } = useForm({
    defaultValues: {
      fullName: defaultData?.fullName || "",
      phoneNumber: defaultData?.phoneNumber || "",
      specializations: defaultSpecializations, 
      imageProfile: null as File | null,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("imageProfile", file, { shouldValidate: true });
      setPreviewImage(URL.createObjectURL(file)); 
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("phoneNumber", data.phoneNumber);

    if (data.imageProfile) {
      formData.append("imageProfile", data.imageProfile);
    }

    if (isStudent) {
      const finalSpecializations = data.specializations.length > 0 ? data.specializations.join(',') : "";
      formData.append("specializations", finalSpecializations);
    }

    // إرسال الـ FormData إلى الـ API Action
    const response = await dynamicApiAction("Account/profile", "PUT", undefined, formData);
    
    if (response.success) {
      toast.success(t("basic_info.save_changes") || "تم حفظ التعديلات بنجاح!");
      router.refresh();
    } else {
      toast.error("حدث خطأ أثناء حفظ البيانات، يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      <div className="flex flex-col items-center justify-center gap-3 pb-4 border-b border-border-light">
        <div className="relative w-24 h-24 rounded-full border-4 border-primary/10 bg-bg-main shadow-sm flex items-center justify-center overflow-hidden group">
          {previewImage ? (
            <Image src={previewImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-text-muted" />
          )}
          <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="w-6 h-6 text-white" />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange} 
            />
          </label>
        </div>
        <span className="text-xs font-bold text-text-muted">{t("basic_info.change_avatar") || "اضغط لتغيير الصورة الشخصية"}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <Field className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-title">{t("basic_info.full_name")}</label>
              <Input
                className="bg-bg-main border-border-light rounded-xl py-6 focus-visible:ring-primary/50 text-base font-medium"
                {...field}
                placeholder={t("basic_info.full_name")}
              />
            </Field>
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Field className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-text-title">{t("basic_info.verified_mobile")}</label>
                <span className="text-success text-[10px] font-bold flex items-center gap-1 bg-success/10 px-2 py-0.5 rounded-md">
                  ✔ {t("basic_info.verified_badge")}
                </span>
              </div>
              <Input
                className="bg-bg-main border-border-light rounded-xl py-6 focus-visible:ring-primary/50 text-base font-medium text-left"
                {...field}
                dir="ltr"
                placeholder={t("basic_info.phone_placeholder")}
              />
            </Field>
          )}
        />

        {isStudent && (
          <Controller
            name="specializations"
            control={control}
            render={({ field }) => {
              const selectedVals: string[] = field.value || [];

              const handleToggle = (value: string) => {
                if (selectedVals.includes(value)) {
                  field.onChange(selectedVals.filter((v) => v !== value));
                } else {
                  field.onChange([...selectedVals, value]);
                }
              };

              const displayLabel = selectedVals.length > 0 
                ? `(${selectedVals.length}) تخصصات محددة`
                : "اختر التخصصات المتاحة لك";

              return (
                <Field className="flex flex-col gap-2 md:col-span-2 relative" ref={dropdownRef}>
                  <label className="text-sm font-bold text-text-title">{t("basic_info.specializations")}</label>
                  
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between bg-bg-main border border-border-light rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/50 text-base font-medium text-right transition-colors hover:bg-bg-main/80"
                  >
                    <span className={selectedVals.length > 0 ? "text-text-title animate-fade-in" : "text-text-muted"}>
                      {displayLabel}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-[85px] left-0 w-full bg-white border border-border-light rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                      <div className="p-2 flex flex-col gap-1">
                        {dentalDiseases.map((option) => {
                          const valStr = String(option.value);
                          const isChecked = selectedVals.includes(valStr);
                          return (
                            <label
                              key={String(option.value)}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-main cursor-pointer transition-colors"
                            >
                              <div className="relative flex items-center justify-center">
                                <input
                                  type="checkbox"
                                  className="w-5 h-5 appearance-none border-2 border-border-light rounded bg-white checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                                  checked={isChecked}
                                  onChange={() => handleToggle(valStr)}
                                />
                                {isChecked && (
                                  <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              <span className={`text-sm font-bold ${isChecked ? "text-primary" : "text-text-title"}`}>
                                {option.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Field>
              );
            }}
          />
        )}
      </div>

      <div className="flex justify-end items-center gap-4 pt-4 border-t border-border-light">
        <Button onClick={() => reset()} type="button" variant="ghost" className="font-bold text-text-muted hover:text-text-title">
          {t("basic_info.cancel")}
        </Button>
        <Button disabled={isSubmitting} type="submit" className="bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-xl font-bold transition-all shadow-md flex items-center gap-2">
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? t("basic_info.save_changes_loading") : t("basic_info.save_changes")}
        </Button>
      </div>
    </form>
  );
}