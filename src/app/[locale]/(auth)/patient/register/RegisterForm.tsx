
"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RiLoader4Line } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegisterSchema } from "./RegisterSchema";
import { patientRegisterType } from "./register.type";
import { registerAction } from "@/app/api/authActions/register.action";
import { egyptGovernorates } from "@/app/constants/locations";
import google from "@/assets/images/icons8-google.svg";
import FormController from "../../../../_components/FormController"; // مسار الكومبوننت

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const t = useTranslations("auth");
  const c = useTranslations("profile");
  const g = useTranslations("governorates");

  const { control, trigger, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {  email: "", password: "", fullName: "",age : "", phoneNumber: "" },
    resolver: zodResolver(RegisterSchema(t)),
    mode: "onChange"
  });

  const handleNext = async () => {
    const isValid = await trigger(["fullName", "email", "password"]);
    if (isValid) setStep(2);
  };

  async function mySubmit(data: patientRegisterType) {
    const isSuccess = await registerAction(data, 'patient');
    if (isSuccess) {
      toast.success("تم إنشاء الحساب بنجاح!");
      setTimeout(() => router.push(`/patient/dashboard`), 1500);
    } else {
      toast.error("عذراً، حدث خطأ أو البريد الإلكتروني مستخدم بالفعل.");
    }
  }

  const inputStyle = "bg-bg-main border-border-light rounded-xl py-6 focus-visible:ring-primary/50 text-base font-medium";

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm w-full">
      <div className="mb-8 space-y-2">
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
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <FormController control={control} name="fullName" label="الاسم بالكامل" placeholder={t(`signup.name_placeholder`)} inputClassName={inputStyle} />
              <FormController control={control} name="email" type="email" label="البريد الإلكتروني" placeholder={t(`signup.email_placeholder`)} inputClassName={inputStyle} />
              <FormController control={control} name="password" type="password" label="كلمة المرور" placeholder={t(`signup.password_placeholder`)} inputClassName={inputStyle} />
              
              <Button type="button" onClick={handleNext} className="w-full h-14 mt-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-base shadow-md shadow-primary/20">
                التالي
              </Button>
            </motion.div>
          ) : (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
             <FormController control={control} name="age" type="number" label="السن" placeholder={t(`signup.age_placeholder`)} inputClassName={inputStyle} />
              <FormController control={control} name="phoneNumber" type="tel" label="رقم الهاتف" placeholder={t(`signup.phone_placeholder`)} inputClassName={inputStyle} />
              
              

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

        <div className="pt-6 border-t border-slate-100 space-y-4">
          {step === 1 && (
            <Button type="button" className="w-full h-14 rounded-xl bg-white hover:bg-slate-50 text-text-title font-bold border border-slate-200 shadow-sm flex items-center justify-center gap-3">
              <Image width={24} height={24} src={google} alt="google" />
              {t(`signup.google_btn`)}
            </Button>
          )}
          <p className="text-center text-text-muted font-medium">
            {t(`signup.already_have_account`)}{" "}
            <Link className="text-primary font-bold hover:underline" href={"/patient/login"}>
              {t(`signup.login_link`)}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}