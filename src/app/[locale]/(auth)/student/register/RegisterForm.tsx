"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RiLoader4Line } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegisterSchema } from "./RegisterSchema";
import { studentRegisterType } from "./register.type";
import { registerAction } from "@/app/api/authActions/register.action";
import { govUniversities } from "@/app/constants/universities";
import { dentalDiseases } from "@/app/constants/diseases";
import FormController from "../../../../_components/FormController"; 

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [isSpecializationsOpen, setIsSpecializationsOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("auth");
  const c = useTranslations("profile");
  const d = useTranslations("nonNumber_diseases");

  const { control, trigger, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {  
      email: "", 
      password: "", 
      fullName: "", 
      phoneNumber: "", 
      universityName: "", 
      uniEmail: "", 
      specializations: [] as number[] 
    },
    resolver: zodResolver(RegisterSchema(t)),
    mode: "onChange"
  });

  const handleNext = async () => {
    const isValid = await trigger(["fullName", "email", "password"]);
    if (isValid) setStep(2);
  };

  async function mySubmit(data: studentRegisterType) {
    try {
      const numericSpecializations = Array.isArray(data.specializations)
        ? data.specializations.map((val) => Number(val))
        : [];

      const finalPayload = {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        universityName: data.universityName,
        uniEmail: data.uniEmail,
        specializations: numericSpecializations // 
      };

      const isSuccess = await registerAction(finalPayload as any, "student");
      
      if (isSuccess) {
        toast.success("تم إنشاء حساب الطبيب بنجاح!");
        setTimeout(() => router.push(`/student/dashboard`), 1500);
      } else {
        toast.error("عذراً، حدث خطأ أو البريد الإلكتروني مستخدم بالفعل.");
      }
    } catch (error) {
      console.error("Register Error:", error);
      toast.error("حدث خطأ غير متوقع أثناء التسجيل.");
    }
  }

  const inputStyle = "bg-bg-main border-border-light rounded-xl py-6 focus-visible:ring-primary/50 text-base font-medium";

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm w-full">
      <div className="mb-8 space-y-2 text-rightAr">
        <h3 className="text-3xl md:text-4xl font-bold font-heading text-text-title">
          {t(`signup.title`)}
        </h3>
        <p className="text-text-muted font-medium text-sm">
          {t(`signup.subtitle`)} - الخطوة {step} من 2
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(mySubmit)}>
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5 text-rightAr">
              <FormController control={control} name="fullName" label="الاسم بالكامل" placeholder={t(`signup.name_placeholder`)} inputClassName={inputStyle} />
              <FormController control={control} name="email" type="email" label="البريد الإلكتروني الشخصي" placeholder={t(`signup.email_placeholder`)} inputClassName={inputStyle} />
              <FormController control={control} name="password" type="password" label="كلمة المرور" placeholder={t(`signup.password_placeholder`)} inputClassName={inputStyle} />
              
              <Button type="button" onClick={handleNext} className="w-full h-14 mt-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-base shadow-md shadow-primary/20">
                التالي
              </Button>
            </motion.div>
          ) : (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5 text-rightAr text-start font-bold">
              <FormController control={control} name="phoneNumber" type="tel" label="رقم الهاتف" placeholder={t(`signup.phone_placeholder`)} inputClassName={inputStyle} />
              <FormController control={control} name="uniEmail" type="email" label="البريد الجامعي" placeholder={t(`signup.academic_email_placeholder`)} inputClassName={inputStyle} />

              <Controller name="universityName" control={control} render={({ field, fieldState }) => (
                <Field className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-title">الجامعة</label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full bg-bg-main border-border-light rounded-xl py-6 focus:ring-primary/50 text-base font-medium">
                      <SelectValue placeholder={c("basic_info.location_placeholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl max-h-75">
                      {govUniversities.map((govKey) => (
                        <SelectItem key={govKey.value} value={govKey.value}>{t(`signup.universities.${govKey.label}`)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError className="text-red-700 text-sm font-bold" errors={[fieldState.error]} />}
                </Field>
              )} />

              <Controller name="specializations" control={control} render={({ field, fieldState }) => {
                const selected = field.value || [];
                
                const toggle = (val: number) => {
                  const numVal = Number(val);
                  const newSelected = selected.includes(numVal) 
                    ? selected.filter((s: number) => s !== numVal) 
                    : [...selected, numVal];
                  field.onChange(newSelected);
                };

                const displayLabel = selected.length === 0 
                  ? null 
                  : selected.length === 1 
                    ? t(`signup.diseases.${dentalDiseases.find((d) => Number(d.value) === selected[0])?.label}`) 
                    : `${selected.length} ${t("signup.diseases_selected")}`;
                
                return (
                  <Field className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-title">التخصصات / الحالات المدعومة</label>
                    <div className="relative w-full">
                      <button type="button" onClick={() => setIsSpecializationsOpen((o) => !o)} className="w-full flex items-center justify-between bg-bg-main border border-border-light rounded-xl py-4 px-4 focus:ring-primary/50 text-base font-medium">
                        <span className={!displayLabel ? "text-gray-400" : "text-text-black"}>{displayLabel ?? t("signup.disease_placeholder")}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`opacity-50 transition-transform duration-200 ${isSpecializationsOpen ? "rotate-180" : ""}`}>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {isSpecializationsOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsSpecializationsOpen(false)} />
                          <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg animate-in fade-in-0 zoom-in-95">
                            <div className="p-2 max-h-60 overflow-y-auto space-y-1">
                              {dentalDiseases.map((disease) => {
                                const diseaseNumValue = Number(disease.value);
                                const isChecked = selected.includes(diseaseNumValue);
                                return (
                                  <div key={disease.value} onClick={() => toggle(diseaseNumValue)} className="relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-slate-50">
                                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${isChecked ? "bg-primary border-primary" : "border-slate-300 bg-transparent"}`}>
                                      {isChecked && <svg viewBox="0 0 12 12" fill="none" className="h-3.5 w-3.5"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    </div>
                                    <span className="text-slate-700">{d(`${disease.label}`)}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {fieldState.invalid && <FieldError className="text-red-700 text-sm font-bold" errors={[fieldState.error]} />}
                  </Field>
                );
              }} />

              <div className="flex gap-3 pt-4">
                <Button type="button" onClick={() => setStep(1)} className="flex-1 h-14 rounded-xl bg-slate-100 hover:bg-slate-200 text-text-title font-bold text-base border border-slate-200">
                  رجوع
                </Button>
                <Button disabled={isSubmitting} type="submit" className="flex-[2] h-14 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-base shadow-md shadow-primary/20">
                  {isSubmitting ? <RiLoader4Line className="animate-spin w-5 h-5 mx-auto" /> : t(`signup.create_btn`)}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-6 border-t border-slate-100">
          <p className="text-center text-text-muted font-medium">
            {t(`signup.already_have_account`)}{" "}
            <Link className="text-primary font-bold hover:underline" href={"/student/login"}>
              {t(`signup.login_link`)}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}