"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { UploadCloud, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation"; // 🟢 استدعاء الروتر للتوجيه بعد النجاح

import { CreateCaseSchema, CreateCaseFormValues } from "./createCaseSchema"; 
import { createCase } from "./createCase.action"; 
import { egyptGovernorates } from "@/app/constants/locations";

export default function CreateCaseForm() {
  const t = useTranslations("CreateCase");
  const tCities = useTranslations("governorates");
  const router = useRouter(); 
  
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<CreateCaseFormValues>({
    resolver: zodResolver(CreateCaseSchema(t)),
    defaultValues: {
      City: "",
      SymptomsText: "",
      PainDuration: "",
      ChronicDiseases: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("Image", file, { shouldValidate: true });
      setPreviewImage(URL.createObjectURL(file)); 
    }
  };

  const onSubmit = async (data: CreateCaseFormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("Image", data.Image);
      formData.append("City", data.City);
      
      if (data.SymptomsText) formData.append("SymptomsText", data.SymptomsText);
      if (data.PainDuration) formData.append("PainDuration", data.PainDuration);
      if (data.ChronicDiseases) formData.append("ChronicDiseases", data.ChronicDiseases);

      const res = await createCase(formData);

      if (res?.success) {
        toast.success(t("toast.success") || "تم رفع الحالة وتحليلها بنجاح!");
        form.reset();
        setPreviewImage(null);
        
        router.push("/patient/dashboard"); 
      } else {
        toast.error(res?.error || t("toast.error") || "حدث خطأ أثناء رفع الحالة.");
      }
      
    } catch (error) {
      toast.error(t("toast.error") || "حدث خطأ أثناء رفع الحالة.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-border-light shadow-sm max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-title mb-2">{t("title")}</h2>
        <p className="text-text-muted text-sm">{t("desc")}</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        
        <div>
          <label className="block text-sm font-bold text-text-title mb-2">
            {t("form.image")} <span className="text-danger">*</span>
          </label>
          <div className="relative border-2 border-dashed border-border-main rounded-xl p-6 hover:bg-slate-50 transition-colors text-center cursor-pointer">
            <input 
              type="file" 
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
            {previewImage ? (
              <div className="flex flex-col items-center">
                <img src={previewImage} alt="Preview" className="h-32 object-contain rounded-lg mb-2" />
                <span className="text-xs text-primary font-bold">تغيير الصورة</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-text-muted">
                <UploadCloud className="w-10 h-10 mb-2 opacity-50" />
                <span className="text-sm font-medium">اضغط هنا لاختيار صورة الأشعة أو الحالة</span>
              </div>
            )}
          </div>
          {form.formState.errors.Image && (
            <p className="text-danger text-xs mt-1 font-bold">{form.formState.errors.Image.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-text-title mb-2">
            {t("form.city")} <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <select
              {...form.register("City")}
              className="w-full bg-bg-main border border-border-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
            >
              <option value="" disabled>
                {t("form.selectCityPlaceholder") || "اختر المحافظة..."}
              </option>
              
              {egyptGovernorates.map((cityObj) => (
                <option key={cityObj.value} value={cityObj.value}>
                  {tCities(cityObj.value)}
                </option>
              ))}
            </select>
            
            <div className="pointer-events-none absolute inset-y-0 left-0 rtl:right-auto rtl:left-0 ltr:right-0 ltr:left-auto flex items-center px-4 text-text-muted">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
          {form.formState.errors.City && (
            <p className="text-danger text-xs mt-1 font-bold">{form.formState.errors.City.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-text-title mb-2">
            {t("form.symptomsText")}
          </label>
          <textarea
            {...form.register("SymptomsText")}
            rows={3}
            className="w-full bg-bg-main border border-border-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            placeholder="مثال: عندي تسوس في الأسنان الأمامية..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-text-title mb-2">
            {t("form.painDuration")}
          </label>
          <input
            {...form.register("PainDuration")}
            type="text"
            className="w-full bg-bg-main border border-border-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="مثال: 4 أيام"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-text-title mb-2">
            {t("form.chronicDiseases")}
          </label>
          <input
            {...form.register("ChronicDiseases")}
            type="text"
            className="w-full bg-bg-main border border-border-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="مثال: ضغط، سكر، أو لا يوجد"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-hover text-white font-bold rounded-xl py-6 mt-4 shadow-md"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            t("form.submitBtn")
          )}
        </Button>
      </form>
    </div>
  );
}