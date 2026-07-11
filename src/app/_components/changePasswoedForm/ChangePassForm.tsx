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
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions";
import { ChangePassType } from "./ChangePass.type";
import { toast } from "react-toastify";

export default function ChangePassForm() {
  const t = useTranslations("profile");

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
    if (respons.success) {
      toast.success(t("security.button_loading")); 
      reset();
    } else {
      const errorMessage = (respons.error as errorType)?.PasswordMismatch?.[0] || 'Failed Process'
      toast.error(errorMessage)
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="flex flex-col sm:flex-row gap-6 w-full">
          <Controller
            name="currentPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-bold text-text-title">
                  {t("security.current_password_label")}
                </label>
                <div className="relative w-full">
                  <Input
                    className="bg-bg-main border-border-light rounded-xl py-6 focus-visible:ring-primary/50 text-base font-medium pe-10"
                    {...field}
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("security.placeholders.current")}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                  >
                    {showCurrentPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError className="text-danger text-sm font-bold mt-1" errors={fieldState.error?.message ? [{ message: fieldState.error.message }] : []} />
                )}
              </Field>
            )}
          />

          <Controller
            name="newPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-bold text-text-title">
                  {t("security.new_password_label")}
                </label>
                <div className="relative w-full">
                  <Input
                    className="bg-bg-main border-border-light rounded-xl py-6 focus-visible:ring-primary/50 text-base font-medium pe-10"
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                  >
                    {showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError className="text-danger text-sm font-bold mt-1" errors={fieldState.error?.message ? [{ message: fieldState.error.message }] : []} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-2 w-full">
              <label className="text-sm font-bold text-text-title">
                {t("security.confirm_password_label")}
              </label>
              <div className="relative w-full">
                <Input
                  className="bg-bg-main border-border-light rounded-xl py-6 focus-visible:ring-primary/50 text-base font-medium pe-10"
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
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              {fieldState.invalid && (
                <FieldError className="text-danger text-sm font-bold mt-1" errors={fieldState.error?.message ? [{ message: fieldState.error.message }] : []} />
              )}
            </Field>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white py-6 px-8 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
          >
            {isSubmitting ? t("security.button_loading") : t("security.button")}
            <CiLock className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}