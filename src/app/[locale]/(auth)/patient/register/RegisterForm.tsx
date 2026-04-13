import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./RegisterSchema";
import { loginType } from "./register.type";
import Image from "next/image";
import google from '@/assets/images/icons8-google.svg'
import { useTranslations } from "next-intl";

export default function RegisterForm() {
  const t =  useTranslations('auth');
  const { control, formState, handleSubmit } = useForm({
    defaultValues: {
      Name: "",
      Email: "",
      Code: "",
      Password: "",
      rePassword: "",
    },
    resolver: zodResolver(RegisterSchema(t)),
  });

  function mySubmit(data: loginType) {
    console.log("Form Data Submitted:", data);
  }
  
  return (
    <div className="px-5 py-12.5 space-y-12.5">
      <div className="text-text-black">
        <h3 className=" text-3xl md:text-4xl font-medium font-heading  leading-7.5 pb-12">
          {t(`signup.title`)}
        </h3>
        <p className="font-normal">{t(`signup.subtitle`)}</p>
      </div>

      <form className="space-y-10" onSubmit={handleSubmit(mySubmit)}>
        <Controller
          name="Name"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              <Input
                className=" border-t-0 border-l-0 border-r-0  border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-text-body placeholder:font-medium placeholder:text-lg text-lg! font-medium! placeholder:opacity-40 "
                {...field}
                id="name"
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder={t(`signup.name_placeholder`)}
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
          name="Email"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              <Input
                className=" border-t-0 border-l-0 border-r-0  border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-text-body placeholder:font-medium placeholder:text-lg text-lg! font-medium! placeholder:opacity-40 "
                {...field}
                id="Email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder={t(`signup.email_placeholder`)}
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
                className=" border-t-0 border-l-0 border-r-0  border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-text-body placeholder:font-medium placeholder:text-lg text-lg! font-medium! placeholder:opacity-40 "
                {...field}
                id="Password"
                type="Password"
                aria-invalid={fieldState.invalid}
                placeholder={t(`signup.password_placeholder`)}
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
          name="rePassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              <Input
                className=" border-t-0 border-l-0 border-r-0  border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-text-body placeholder:font-medium placeholder:text-lg text-lg! font-medium! placeholder:opacity-40 "
                {...field}
                id="rePassword"
                type="Password"
                aria-invalid={fieldState.invalid}
                placeholder={t(`signup.confirm_password_placeholder`)}
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
        <div className="space-y-8">
          <Button className="flex gap-2.5 h-auto rounded-[70px] py-4 px-21.5 mx-auto bg-primary hover:bg-primary-hover text-[#E3EFFF] font-medium ">
            {t(`signup.create_btn`)}
          </Button>
          <Button type="button" className="flex gap-2.5 h-auto rounded-[70px] py-4 px-21.5 mx-auto bg-transparent hover:bg-primary-subtle  font-medium border border-[#00000066] text-text-black ">
            <span className="flex gap-4 items-center"><Image width={24} height={24} src={google}  alt="google"></Image>{t(`signup.google_btn`)}</span>
          </Button>
          <div className="flex gap-4 text-text-black ">
            {t(`signup.already_have_account`)}
            <Link className="font-medium" href={'/patient/login'}>{t(`signup.login_link`)}</Link>
             </div>
        </div>
      </form>
    </div>
  );
}
