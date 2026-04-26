"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { passwordSchema } from "./ChangePass.schema";
import { changePassType } from "./ChangePass.type";
import { useTranslations } from "next-intl";
import { CiLock } from "react-icons/ci";

export default function ChangePassForm() {
  const t = useTranslations("profile");

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(passwordSchema(t)),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: changePassType) => console.log(data);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Controller
            name="currentPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-2"
              >
                <label className="text-sm font-medium text-text-black">
                  {t("security.current_password_label")}
                </label>
                <Input
                  className="border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-gray-300 placeholder:font-medium placeholder:text-md text-lg! font-medium!"
                  {...field}
                  id="currentPassword"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder={t("security.placeholders.current")}
                  autoComplete="off"
                />
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

          {/* New Password */}
          <Controller
            name="newPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-2"
              >
                <label className="text-sm font-medium text-text-black">
                  {t("security.new_password_label")}
                </label>
                <Input
                  className="border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-gray-300 placeholder:font-medium placeholder:text-md text-lg! font-medium!"
                  {...field}
                  id="newPassword"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder={t("security.placeholders.new")}
                  autoComplete="off"
                />
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
        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              <label className="text-sm font-medium text-text-black">
                {t("security.confirm_password_label")}
              </label>
              <Input
                className="border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-gray-300 placeholder:font-medium placeholder:text-md text-lg! font-medium!"
                {...field}
                id="confirmPassword"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder={t("security.placeholders.confirm")}
                autoComplete="off"
              />
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
        {/* Current Password */}

        <Button
          type="submit"
          className="w-fit bg-primary hover:bg-primary-hover text-white py-6 rounded-xl mt-4"
        >
          {t("security.button")}
          <CiLock />
        </Button>
      </form>
    </div>
  );
}
