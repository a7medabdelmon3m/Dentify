"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./RegisterSchema";
import { patientRegisterType } from "./register.type";
import google from "@/assets/images/icons8-google.svg";
import { useTranslations } from "next-intl";
import { registerAction } from "@/app/api/chat/authActions/register.action";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { egyptGovernorates } from "@/app/constants/locations";
import { RiLoader4Line } from "react-icons/ri";

export default function RegisterForm() {
  const router = useRouter();
  const t = useTranslations("auth");
  const c = useTranslations("profile");
  const g = useTranslations("governorates");

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      fullName: "",
      phoneNumber: "",
      city: "",
    },
    resolver: zodResolver(RegisterSchema(t)),
  });

  async function mySubmit(data: patientRegisterType) {
    const isSuccess = await registerAction(data ,'patient');
    console.log("Form Data Submitted:", data);
    console.log("isSuccess:", isSuccess);
    if (isSuccess) {
      toast.success("your account is created successfully");

      setTimeout(() => {
        router.push(`/patient/dashboard`);
      }, 1500);
    } else {
      toast.error("Oops!something is error or this mail is already exist");
    }
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
          name="fullName"
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
          name="userName"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              <Input
                className=" border-t-0 border-l-0 border-r-0  border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-text-body placeholder:font-medium placeholder:text-lg text-lg! font-medium! placeholder:opacity-40 "
                {...field}
                id="username"
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder={t(`signup.userName_placeholder`)}
                // autoComplete="off"
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
          name="email"
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
          name="password"
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
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              <Input
                className=" border-t-0 border-l-0 border-r-0  border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-text-body placeholder:font-medium placeholder:text-lg text-lg! font-medium! placeholder:opacity-40 "
                {...field}
                id="phone"
                type="tel"
                aria-invalid={fieldState.invalid}
                placeholder={t(`signup.phone_placeholder`)}
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
          name="city"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2 md:col-span-2"
            >
              <div className="space-y-2">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full h-auto! border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] bg-transparent py-3 px-0 rounded-none! shadow-none focus:ring-0 focus:border-sky-500 data-placeholder:text-gray-300 text-lg font-medium">
                    <SelectValue
                      placeholder={c("basic_info.location_placeholder")}
                    />
                  </SelectTrigger>

                  <SelectContent className="bg-white max-h-75">
                    {egyptGovernorates.map((govKey) => (
                      <SelectItem
                        key={govKey.value}
                        value={govKey.value}
                        className="cursor-pointer hover:bg-sky-50 focus:bg-sky-50 transition-colors"
                      >
                        {/* هنا بنجيب اسم المحافظة من ملف الترجمة */}
                        {g(`${govKey.value}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError
                    className="text-red-700 text-sm"
                    errors={[fieldState.error]}
                  />
                )}
              </div>
            </Field>
          )}
        />
        <div className="space-y-8">
          <Button
            disabled={isSubmitting}
            className="flex gap-2.5 h-auto rounded-[70px] py-4 px-21.5 mx-auto bg-primary hover:bg-primary-hover text-[#E3EFFF] font-medium "
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <RiLoader4Line className="font-bold animate-spin transition-all" />
                {t(`signup.signup.create_btn_Liading`)}{" "}
              </span>
            ) : (
              t(`signup.create_btn`)
            )}{" "}
          </Button>
          <Button
            type="button"
            className="flex gap-2.5 h-auto rounded-[70px] py-4 px-21.5 mx-auto bg-transparent hover:bg-primary-subtle  font-medium border border-[#00000066] text-text-black "
          >
            <span className="flex gap-4 items-center">
              <Image width={24} height={24} src={google} alt="google"></Image>
              {t(`signup.google_btn`)}
            </span>
          </Button>
          <div className="flex gap-4 text-text-black ">
            {t(`signup.already_have_account`)}
            <Link className="font-medium" href={"/patient/login"}>
              {t(`signup.login_link`)}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
