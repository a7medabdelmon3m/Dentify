"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { basicInfoSchema } from "./InfoForm.schema";
import { infoType } from "./InfoFom.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { egyptGovernorates } from "@/app/constants/locations";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function InfoForm() {
  const t = useTranslations("profile");
  const g = useTranslations("governorates");
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(basicInfoSchema(t)),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      specializations: null,
      // email: "",
      // location: "",
    },
  });

  const onSubmit = async (data: infoType) => {
    // console.log("Basic Info Data:", data)
    const requestBody = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      // 2. إجبار السيستم يبعت التخصصات بـ null للمريض
      specializations: null,
    };

    // console.log("Body ready to send:", requestBody);
    const response = await dynamicApiAction(
      "Account/profile",
      "PUT",
      undefined,
      requestBody,
    );
    // console.log('response : ' , response );
    if (response.success) {
      toast.success("Successful Process");
      reset({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        specializations: null
      });
      router.refresh();
    } else {
      toast.error("Failed Process");
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10"
      >
        {/* Full Name */}
        <Controller
          name="fullName"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              <label className="text-sm font-medium text-text-black">
                {t("basic_info.full_name")}
              </label>
              <Input
                className="border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-gray-300 placeholder:font-medium placeholder:text-md text-lg! font-medium!"
                {...field}
                id="fullName"
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder={t("basic_info.full_name")}
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-red-700 text-sm"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        {/* Mobile Number */}
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-text-black">
                  {t("basic_info.verified_mobile")}
                </label>
                <span className="text-green-600 text-[10px] font-bold flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded">
                  ✔ {t("basic_info.verified_badge")}
                </span>
              </div>
              <Input
                className="border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-gray-300 placeholder:font-medium placeholder:text-md text-lg! font-medium!"
                {...field}
                id="phoneNumber"
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder={t("basic_info.phone_placeholder")}
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-red-700 text-sm"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        {/* Date of Birth */}
        {/* <Controller
          name="dob"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              <label className="text-sm font-medium text-text-black">
                {t("basic_info.dob")}
              </label>
              <Input
                className="border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-gray-300 placeholder:font-medium placeholder:text-md text-lg! font-medium!"
                {...field}
                id="dob"
                type="date"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-red-700 text-sm"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        /> */}

        {/* Email Address */}
        {/* <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2"
            >
              <label className="text-sm font-medium text-text-black">
                {t("basic_info.email")}
              </label>
              <Input
                className="border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] flex justify-between bg-transparent py-2 outline-none! rounded-none! focus-visible:ring-0 placeholder:text-gray-300 placeholder:font-medium placeholder:text-md text-lg! font-medium!"
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder={t("basic_info.email_placeholder")}
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-red-700 text-sm"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        /> */}

        {/* Location */}
        {/* <Controller
          name="location"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-2 md:col-span-2"
            >
              <label className="text-sm font-medium text-text-black">
                {t("basic_info.select_location")}
              </label>

              <div className="space-y-2">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full h-auto! border-t-0 border-l-0 border-r-0 border-b! border-[#3A3A3A] bg-transparent py-3 px-0 rounded-none! shadow-none focus:ring-0 focus:border-sky-500 data-[placeholder]:text-gray-300 text-lg font-medium">
                    <SelectValue
                      placeholder={t("basic_info.location_placeholder")}
                    />
                  </SelectTrigger>

                  <SelectContent className="bg-white max-h-[300px]">
                    {egyptGovernorates.map((govKey) => (
                      <SelectItem
                        key={govKey.value}
                        value={govKey.value}
                        className="cursor-pointer hover:bg-sky-50 focus:bg-sky-50 transition-colors"
                      >
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
        /> */}

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end items-center gap-6 mt-6">
          <Button
            onClick={() => reset()}
            type="button"
            variant="ghost"
            className=" text-gray-400 hover:text-gray-600"
          >
            {t("basic_info.cancel")}
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-primary hover:bg-primary-hover text-white px-10 py-6 rounded-xl shadow-md transition-all active:scale-95"
          >
            {isSubmitting
              ? t("basic_info.save_changes_loading")
              : t("basic_info.save_changes")}
          </Button>
        </div>
      </form>
    </div>
  );
}
