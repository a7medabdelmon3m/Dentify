'use client'
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function ForgetForm() {
const{control}= useForm({})
const t = useTranslations(`auth`)
  return (
    <form className="space-y-10">
        
      <Controller
        name="Email"
          control={control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className="flex flex-col gap-1"
          >
            <FieldLabel className="text-text-black font-medium text-sm leading-5" htmlFor="name">{t(`forgot_password.email_label`)}</FieldLabel>
            <Input
              className=" border border-[#0000001A] rounded-[100px] flex gap-1 justify-between bg-transparent py-2 px-3 outline-none! h-auto focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-primary  placeholder:leading-5 placeholder:text-sm placeholder:text-[#00000080]  text-lg! font-medium! "
              {...field}
              id="Email"
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder={t(`forgot_password.email_placeholder`)}
              autoComplete="off"
            />
            {fieldState.invalid && (
              <FieldError
                className="text-red-700"
                errors={[fieldState.error]}
              />
            )}
            <span className="text-xs leading-4 text-[#00000080]">{t(`forgot_password.hint`)}</span>
          </Field>
        )}
      />
      <div className="flex gap-3">
        <Button type="button" className=" rounded-[70px] p-3 border border-primary h-auto bg-transparent hover:bg-primary-subtle transition-colors duration-100 flex-1">{t(`forgot_password.cancel_btn`)}</Button>
        <Button  className=" rounded-[70px] p-3 border border-primary h-auto bg-primary hover:bg-primary-hover transition-colors duration-100 flex-1 text-white">{t(`forgot_password.submit_btn`)}</Button>
      </div>
    </form>
  );
}
