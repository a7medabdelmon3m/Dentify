"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./RegisterSchema";
import { studentRegisterType } from "./register.type";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { govUniversities } from "@/app/constants/universities";
import { dentalDiseases } from "@/app/constants/diseases";
import { registerAction } from "@/app/api/chat/authActions/register.action";
import { RiLoader4Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const t = useTranslations(`auth`);
  const c = useTranslations(`profile`);
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
      uniEmail: "",
      specializations: [],
    },
    resolver: zodResolver(RegisterSchema(t)),
  });

  async function mySubmit(
    data: studentRegisterType,
    e?: React.BaseSyntheticEvent,
  ) {
    if (e) {
      e.preventDefault();
    }
    const isSuccess = await registerAction(data, "student");
    console.log("Form Data Submitted:", data);
    console.log("isSuccess:", isSuccess);
    if (isSuccess) {
      toast.success("your account is created successfully");

      setTimeout(() => {
        router.push(`/student/dashboard`);
      }, 1500);
    } else {
      toast.error("Oops!something is error or this mail is already exist");
    }
  }
  return (
    <div className="px-5 py-12.5 space-y-12.5">
      <div className="text-text-black">
        <h3 className="text-3xl md:text-4xl font-medium font-heading  leading-7.5 pb-12">
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
                id="email"
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
                id="Phone"
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
                    {govUniversities.map((govKey) => (
                      <SelectItem
                        key={govKey.label}
                        value={govKey.value}
                        className="cursor-pointer hover:bg-sky-50 focus:bg-sky-50 transition-colors"
                      >
                        {t(`signup.universities.${govKey.label}`)}
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
        <Controller
          name="uniEmail"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              <Input
                className=" border-t-0 border-l-0 border-r-0  border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-text-body placeholder:font-medium placeholder:text-lg text-lg! font-medium! placeholder:opacity-40 "
                {...field}
                id="academic_email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder={t(`signup.academic_email_placeholder`)}
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
          name="specializations"
          control={control}
          render={({ field, fieldState }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [open, setOpen] = useState(false);

            const selected = field.value || [];

            const toggle = (val: number) => {
              const newSelected = selected.includes(val)
                ? selected.filter((s: number) => s !== val)
                : [...selected, val];
              field.onChange(newSelected);
            };

            // عشان نعرض اسم المرض لو اختار واحد، أو عددهم لو اختار أكتر من واحد
            const displayLabel =
              selected.length === 0
                ? null
                : selected.length === 1
                  ? t(
                      `signup.diseases.${dentalDiseases.find((d) => d.value === selected[0])?.label}`,
                    )
                  : `${selected.length} ${t("signup.diseases_selected")}`;

            return (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-2 md:col-span-2"
              >
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className="w-full h-auto! border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] flex items-center justify-between bg-transparent py-3 px-0 outline-none! rounded-none! shadow-none focus:ring-0 text-lg font-medium"
                  >
                    <span
                      className={
                        !displayLabel
                          ? "text-gray-400 opacity-80"
                          : "text-text-black"
                      }
                    >
                      {displayLabel ?? t("signup.disease_placeholder")}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`shrink-0 opacity-50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* ── القائمة المنسدلة (Dropdown Content) ── */}
                  {open && (
                    <>
                      {/* خلفية شفافة عشان لما تدوس بره يقفل */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setOpen(false)}
                      />

                      <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border bg-white shadow-lg animate-in fade-in-0 zoom-in-95">
                        <div className="p-1 max-h-60 overflow-y-auto">
                          {dentalDiseases.map((disease) => {
                            const isChecked = selected.includes(disease.value);
                            return (
                              <div
                                key={disease.value}
                                onClick={() => toggle(disease.value)}
                                className="relative flex cursor-pointer select-none items-center gap-3 rounded-sm px-3 py-2 text-base outline-none transition-colors hover:bg-sky-50"
                              >
                                {/* مربع الـ Checkbox المخصص */}
                                <div
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                                    isChecked
                                      ? "bg-primary border-primary"
                                      : "border-gray-400 bg-transparent"
                                  }`}
                                >
                                  {isChecked && (
                                    <svg
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      className="h-3.5 w-3.5"
                                    >
                                      <path
                                        d="M2 6l3 3 5-5"
                                        stroke="white"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <span className="font-medium text-gray-800">
                                  {t(`signup.diseases.${disease.label}`)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* ── رسالة الخطأ لو مسابها فاضية ── */}
                {fieldState.invalid && (
                  <FieldError
                    className="text-red-700 text-sm"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            );
          }}
        />
        <div className="space-y-8">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="flex gap-2.5 h-auto rounded-[70px] py-4 px-25 mx-auto bg-primary hover:bg-primary-hover text-[#E3EFFF] font-medium "
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <RiLoader4Line className="font-bold animate-spin transition-all" />
                {t(`signup.signup.create_btn_Loading`)}{" "}
              </span>
            ) : (
              t(`signup.create_btn`)
            )}{" "}
          </Button>
          <div className="flex gap-4 text-text-black ">
            {t(`signup.already_have_account`)}
            <Link className="font-medium" href={"/student/login"}>
              {t(`signup.login_link`)}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
