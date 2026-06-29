"use client";
import React, { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown } from "lucide-react"; // أيقونة السهم للدروب داون

// قائمة التخصصات (تقدر تربطها بملفات الترجمة أو الـ API لو حابب)
const SPECIALIZATIONS_OPTIONS = [
  { id: "Endodontics", label: "علاج جذور (Endodontics)" },
  { id: "OralSurgery", label: "خلع جراحي (Oral Surgery)" },
  { id: "Orthodontics", label: "تقويم أسنان (Orthodontics)" },
  { id: "Periodontics", label: "علاج لثة (Periodontics)" },
  { id: "Prosthodontics", label: "تركيبات (Prosthodontics)" },
  { id: "Cleaning", label: "تنظيف جير (Scaling)" },
];

export default function InfoForm({ role, defaultData }: { role: string, defaultData?: any }) {
  const t = useTranslations("profile");
  const router = useRouter();
  const isStudent = role === "Student";

  // State للتحكم في فتح/قفل الدروب داون
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // دالة عشان تقفل الدروب داون لو اليوزر داس بره
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // تجهيز القيم الافتراضية (تحويل التخصصات لمصفوفة لو هي راجعة كـ String)
  const defaultSpecializations = Array.isArray(defaultData?.specializations) 
    ? defaultData.specializations 
    : (typeof defaultData?.specializations === 'string' && defaultData?.specializations !== "")
      ? defaultData.specializations.split(',')
      : [];

  const { control, handleSubmit, formState: { isSubmitting }, reset } = useForm({
    defaultValues: {
      fullName: defaultData?.fullName || "",
      phoneNumber: defaultData?.phoneNumber || "",
      bio: defaultData?.bio || "",
      specializations: defaultSpecializations, // مصفوفة فاضية كبداية
    },
  });

  const onSubmit = async (data: any) => {
    // تجهيز الداتا للباك إيند
    // لو الباك إيند بياخد التخصصات كـ Array هنبعتها زي ما هي، لو بياخدها String هنعملها join
    const finalSpecializations = isStudent 
      ? (data.specializations.length > 0 ? data.specializations.join(',') : null) 
      : null;

    const requestBody = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      bio: isStudent ? data.bio : null,
      specializations: finalSpecializations,
    };

    const response = await dynamicApiAction("Account/profile", "PUT", undefined, requestBody);
    
    if (response.success) {
      toast.success(t("basic_info.save_changes"));
      router.refresh();
    } else {
      toast.error("Failed Process");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* ── الاسم الرباعي ── */}
      <Controller
        name="fullName"
        control={control}
        render={({ field, fieldState }) => (
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

      {/* ── رقم الهاتف ── */}
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field, fieldState }) => (
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

      {/* ── حقول خاصة بالطالب فقط ── */}
      {isStudent && (
        <>
          {/* دروب داون التخصصات المتعددة (Multi-select Checkboxes) */}
          <Controller
            name="specializations"
            control={control}
            render={({ field }) => {
              const selectedVals: string[] = field.value || [];

              const handleToggle = (id: string) => {
                if (selectedVals.includes(id)) {
                  field.onChange(selectedVals.filter((v) => v !== id)); // إزالة التخصص لو متواجد
                } else {
                  field.onChange([...selectedVals, id]); // إضافة التخصص لو مش متواجد
                }
              };

              // تحديد النص اللي هيظهر جوه الزرار
              const displayLabel = selectedVals.length > 0 
                ? `تم اختيار (${selectedVals.length}) تخصص`
                : "اختر التخصصات المتاحة لك";

              return (
                <Field className="flex flex-col gap-2 md:col-span-2 relative" ref={dropdownRef}>
                  <label className="text-sm font-bold text-text-title">{t("basic_info.specializations")}</label>
                  
                  {/* زرار الدروب داون */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between bg-bg-main border border-border-light rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/50 text-base font-medium text-right transition-colors hover:bg-bg-main/80"
                  >
                    <span className={selectedVals.length > 0 ? "text-text-title" : "text-text-muted"}>
                      {displayLabel}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* القائمة المنسدلة للـ Checkboxes */}
                  {isDropdownOpen && (
                    <div className="absolute top-[85px] left-0 w-full bg-white border border-border-light rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                      <div className="p-2 flex flex-col gap-1">
                        {SPECIALIZATIONS_OPTIONS.map((option) => {
                          const isChecked = selectedVals.includes(option.id);
                          return (
                            <label
                              key={option.id}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-main cursor-pointer transition-colors"
                            >
                              {/* شيك بوكس مخصص */}
                              <div className="relative flex items-center justify-center">
                                <input
                                  type="checkbox"
                                  className="w-5 h-5 appearance-none border-2 border-border-light rounded bg-white checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                                  checked={isChecked}
                                  onChange={() => handleToggle(option.id)}
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

          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <Field className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-text-title">{t("basic_info.bio")}</label>
                <Textarea
                  className="bg-bg-main border-border-light rounded-xl p-4 min-h-[100px] focus-visible:ring-primary/50 text-base font-medium resize-none"
                  {...field}
                  placeholder="اكتب نبذة مختصرة عنك وعن خبراتك لتظهر للمرضى..."
                />
              </Field>
            )}
          />
        </>
      )}

      {/* ── أزرار الحفظ ── */}
      <div className="md:col-span-2 flex justify-end items-center gap-4 mt-4 pt-4 border-t border-border-light">
        <Button onClick={() => reset()} type="button" variant="ghost" className="font-bold text-text-muted hover:text-text-title">
          {t("basic_info.cancel")}
        </Button>
        <Button disabled={isSubmitting} type="submit" className="bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-xl font-bold transition-all shadow-md">
          {isSubmitting ? t("basic_info.save_changes_loading") : t("basic_info.save_changes")}
        </Button>
      </div>
    </form>
  );
}