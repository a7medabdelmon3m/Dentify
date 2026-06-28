"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { passwordSchema } from "./ChangePass.schema";
import { useTranslations } from "next-intl";
import { CiLock } from "react-icons/ci";
// استيراد أيقونات العين من fa6
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions";
import { ChangePassType } from "./ChangePass.type";
import { toast } from "react-toastify";

export default function ChangePassForm() {
  const t = useTranslations("profile");

  // States للتحكم في إظهار وإخفاء كل باسورد بشكل منفصل
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit, formState: { isSubmitting }, reset } = useForm({
    resolver: zodResolver(passwordSchema(t)),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  type errorType = {
    PasswordMismatch: string[]
  }

  const onSubmit = async (data: ChangePassType) => {
    const respons = await dynamicApiAction('Account/change-password', 'PUT', undefined, data)
    console.log('respons : ', respons);
    if (respons.success) {
      toast.success('Successful Process')
      reset();
    } else {
      const errorMessage = (respons.error as errorType)?.PasswordMismatch?.[0] || 'Failed Process'
      toast.error(errorMessage)
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          
          {/* حقل كلمة المرور الحالية */}
          <Controller
            name="currentPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-2 flex-1"
              >
                <label className="text-sm font-medium text-text-black">
                  {t("security.current_password_label")}
                </label>
                <div className="relative w-full">
                  <Input
                    // ضفنا pe-10 عشان النص مايدخلش تحت الأيقونة
                    className="border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] w-full bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-gray-300 placeholder:font-medium placeholder:text-md text-lg! font-medium! pe-10"
                    {...field}
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("security.placeholders.current")}
                    autoComplete="off"
                  />
                  {/* زرار العين */}
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors px-2"
                  >
                    {showCurrentPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError
                    className="text-red-700 text-sm"
                    errors={
                      fieldState.error?.message
                        ? [{ message: fieldState.error.message }]
                        : []
                    }
                  />
                )}
              </Field>
            )}
          />

          {/* حقل كلمة المرور الجديدة */}
          <Controller
            name="newPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-2 flex-1"
              >
                <label className="text-sm font-medium text-text-black">
                  {t("security.new_password_label")}
                </label>
                <div className="relative w-full">
                  <Input
                    className="border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] w-full bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-gray-300 placeholder:font-medium placeholder:text-md text-lg! font-medium! pe-10"
                    {...field}
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("security.placeholders.new")}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors px-2"
                  >
                    {showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError
                    className="text-red-700 text-sm"
                    errors={
                      fieldState.error?.message
                        ? [{ message: fieldState.error.message }]
                        : []
                    }
                  />
                )}
              </Field>
            )}
          />
        </div>

        {/* حقل تأكيد كلمة المرور */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2 w-full"
            >
              <label className="text-sm font-medium text-text-black">
                {t("security.confirm_password_label")}
              </label>
              <div className="relative w-full">
                <Input
                  className="border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] w-full bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-gray-300 placeholder:font-medium placeholder:text-md text-lg! font-medium! pe-10"
                  {...field}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  placeholder={t("security.placeholders.confirm")}
                  autoComplete="off"
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
                  className="text-red-700 text-sm"
                  errors={
                    fieldState.error?.message
                      ? [{ message: fieldState.error.message }]
                      : []
                  }
                />
              )}
            </Field>
          )}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-fit bg-primary hover:bg-primary-hover text-white py-6 px-8 rounded-xl mt-4 gap-2"
        >
          {isSubmitting ? t("security.button_loading") : t("security.button")}
          <CiLock className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
}