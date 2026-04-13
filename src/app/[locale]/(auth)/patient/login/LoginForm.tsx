import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./LoginSchema";
import { loginType } from "./login.type";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const t = useTranslations(`auth`) ;
  const { control, formState, handleSubmit } = useForm({
    defaultValues:{
        Email:"",
        Password:"",
    },
    resolver:zodResolver(LoginSchema(t))
  });

  function mySubmit(data:loginType){
    console.log("Form Data Submitted:", data);
  }
  
  return (
    <div className="px-5 py-12.5 space-y-12.5">
      <h3 className="text-4xl font-bold font-heading text-text-title leading-[30%] pb-12">
        {t(`login.title`)}
      </h3>

      <form className="space-y-10" onSubmit={handleSubmit(mySubmit)}>
        <Controller
          name="Email"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              <Input
                className=" border-t-0 border-l-0 border-r-0  border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-text-body placeholder:font-medium placeholder:text-lg text-lg! font-medium! "
                {...field}
                id="Email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder={t(`login.email_phone_placeholder`)}
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-red-700"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
        <Controller
          name="Password"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              <Input
                className=" border-t-0 border-l-0 border-r-0  border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-text-body placeholder:font-medium placeholder:text-lg text-lg! font-medium! "
                {...field}
                id="Password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder={t(`login.password_placeholder`)}
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-red-700"
                  errors={[fieldState.error]}
                />
              )}
              <Link className="text-[#34A853] leading-6" href={"/patient/forget-password"}>
                {t(`login.forget_password`)}
              </Link>
            </Field>
          )}
        />
        <div className="space-y-2.5">
            <Button className="flex gap-2.5 h-auto rounded-[80px] py-2.5 px-5 bg-primary hover:bg-primary-hover text-white w-full">{t(`login.login_btn`)}</Button>
            <p>{t(`login.no_account`)} <Link className="text-[#34A853] underline" href={'/patient/register'}>{t(`login.sign_up_link`)}</Link></p>
        </div>
      </form>
    </div>
  );
}
