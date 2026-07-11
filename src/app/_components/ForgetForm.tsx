"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { forgetPasswordAction } from "../api/authActions/forgetPassword.action";
import { useRouter } from "next/navigation";
import { RiLoader4Line } from "react-icons/ri";
import SuccessMessage from "./forget.ui/successMessage";
import ErrorMasseage from "./forget.ui/errorMasseage";
import { forgetPasswordType } from "@/type";
import { apiRequest } from "../api/services/denti.services";
import { checkEmail, dynamicApiAction } from "../[locale]/(patient)/patient/patient.actions";
import { toast } from "react-toastify";
interface ForgetFormProps {
  onSentSuccess: () => void;
}
export default function ForgetForm({ onSentSuccess }: ForgetFormProps) {
  const t = useTranslations("auth");
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const forgetPawwordSchema = z.object({
    email: z
      .email(t(`validation.email.format`))
      .nonempty(t(`validation.email.required`)),
  });
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPawwordSchema),
  });

  

  async function mySubmit(data: forgetPasswordType) {
  
  const response = await forgetPasswordAction(data);

  
  setStatus("success");
  onSentSuccess();
  toast.success("لو الإيميل ده مسجل عندنا، هتوصلك رسالة فيه رابط استعادة كلمة المرور.");

  
}
  return (
    <>
      {status === "success" ? (
        <SuccessMessage />
      ) : (
        <form onSubmit={handleSubmit(mySubmit)} className="space-y-10">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1"
              >
                <FieldLabel
                  className="text-text-black font-medium text-sm leading-5"
                  htmlFor="name"
                >
                  {t(`forgot_password.email_label`)}
                </FieldLabel>
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
                <span className="text-xs leading-4 text-[#00000080]">
                  {t(`forgot_password.hint`)}
                </span>
              </Field>
            )}
          />
          <div className="flex gap-3">
            <Button
              type="button"
              className=" rounded-[70px] p-3 border border-primary h-auto bg-transparent hover:bg-primary-subtle transition-colors duration-100 flex-1"
            >
              {t(`forgot_password.cancel_btn`)}
            </Button>
            <Button
              disabled={isSubmitting}
              className=" rounded-[70px] p-3 border border-primary h-auto bg-primary hover:bg-primary-hover transition-colors duration-100 flex-1 text-white"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <RiLoader4Line className="font-bold animate-spin transition-all" />
                  {t(`forgot_password.submit_btn_loading`)}{" "}
                </span>
              ) : (
                t(`forgot_password.submit_btn`)
              )}
            </Button>
          </div>
        </form>
      )}

      {status === 'error' && <ErrorMasseage />}
    </>
  );
}
