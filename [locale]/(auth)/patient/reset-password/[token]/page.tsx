"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import resetImage from "@/assets/images/reset-password-illustration.svg"; // حط هنا مسار أي صورة Vector عندك
import { dynamicApiAction } from "../../../../(patient)/patient/patient.actions";

// 1. تحديد الـ Schema للتحقق من الباسورد وتطابقه
const getResetSchema = (t: any) => z.object({
  newPassword: z.string().min(8, { message: t("errors.passwordTooShort") }),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: t("errors.passwordsDoNotMatch"),
  path: ["confirmPassword"],
});

type ResetFormType = z.infer<ReturnType<typeof getResetSchema>>;

export default function ResetPasswordPage() {
  const t = useTranslations("auth.resetPassword");
  const router = useRouter();
  
  // 2. استخراج التوكن والايميل من اللينك اللي جاي في الايميل
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // التحكم في إظهار وإخفاء الباسورد
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm<ResetFormType>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(getResetSchema(t)),
  });

async function onSubmit(data: ResetFormType) {
    if (!token || !email) {
      toast.error(t("errors.invalidLink"));
      return;
    }

    // تجهيز الداتا بالشكل الجديد اللي الباك إيند طالبه
    const requestBody = {
      email: email,
      token: token,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmPassword, // ضفنا الحقل ده هنا
    };

    // استدعاء الـ API
    const response = await dynamicApiAction("Auth/ResetPassword", "POST", undefined, requestBody);

    if (response.success) {
      toast.success(t("successMessage"));
      router.push("/login");
    } else {
      toast.error(String(response.error) || t("errors.generic"));
    }
  }
  return (
    <div className="min-h-screen flex bg-bg-main">
      
      {/* الجزء الأول: الفورمة (بيأخد الشاشة كلها في الموبايل، ونصها في الكمبيوتر) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24">
        <div className="w-full max-w-md space-y-8">
          
          {/* عنوان الصفحة ووصفها */}
          <div className="text-rightAr space-y-2">
            <h1 className="text-3xl font-heading font-bold text-text-title">
              {t("title")}
            </h1>
            <p className="text-text-muted font-medium">
              {t("description")}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
            
            {/* حقل كلمة المرور الجديدة (بنفس الستايل بتاعك) */}
            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-2 relative"
                >
                  <div className="relative">
                    <Input
                      // نفس الستايل اللي بعته بالظبط
                      className="border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] w-full bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-text-body placeholder:font-medium placeholder:text-lg text-lg! font-medium! pe-10"
                      {...field}
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder={t("newPasswordPlaceholder")}
                      autoComplete="new-password"
                    />
                    {/* زرار إظهار/إخفاء الباسورد */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors px-2"
                    >
                      {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-700 text-xs font-semibold mt-1"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            {/* حقل تأكيد كلمة المرور */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-2 relative"
                >
                  <div className="relative">
                    <Input
                      className="border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] w-full bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-text-body placeholder:font-medium placeholder:text-lg text-lg! font-medium! pe-10"
                      {...field}
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder={t("confirmPasswordPlaceholder")}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors px-2"
                    >
                      {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-700 text-xs font-semibold mt-1"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            {/* زرار الحفظ */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-xl bg-primary hover:bg-primary-hover text-white font-heading font-bold text-lg mt-8 transition-all"
            >
              {isSubmitting ? t("submittingBtn") : t("submitBtn")}
            </Button>

          </form>
        </div>
      </div>

      {/* الجزء الثاني: الصورة المعبرة (بيظهر في شاشات اللاب توب والكمبيوتر بس) */}
      <div className="hidden lg:flex w-1/2 bg-primary-subtle/30 justify-center items-center p-12 relative overflow-hidden">
        {/* ممكن تضيف Pattern أو شكل هندسي في الخلفية هنا لو حابب */}
        <div className="relative w-full max-w-lg aspect-square">
          <Image
            src={resetImage}
            alt="Reset Password Illustration"
            fill
            className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>
      </div>

    </div>
  );
}