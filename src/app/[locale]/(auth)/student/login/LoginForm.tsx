
"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./LoginSchema";
import { studentLoginType } from "./login.type";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RiLoader4Line } from "react-icons/ri";
import { loginAction } from "@/app/api/authActions/login.action";
import FormController from "../../../../_components/FormController"; // تأكد من مسار الكومبوننت عندك

export default function LoginForm() {
  const router = useRouter();
  const t = useTranslations(`auth`);
  
  const { control, formState: { isSubmitting }, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginSchema(t)),
  });

  async function mySubmit(data: studentLoginType) {
    const login = await loginAction(data ,"student");
    if (login.status) {
      toast.success(`أهلاً بعودتك ${login.data.displayName}`);
      if (data.email === "Hamza44@gmail.com" && data.password === "P@ssw0rd")
        setTimeout(() => router.push(`/admin/dashboard`), 1000);
      else
      setTimeout(() => router.push(`/student/dashboard`), 1000);
    } else {
      toast.error(`عذراً! البريد الإلكتروني أو كلمة المرور غير صحيحة`);
    }
  }

  const inputStyle = "bg-bg-main border-border-light rounded-xl py-6 focus-visible:ring-primary/50 text-base font-medium";

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm w-full">
      <div className="mb-8 space-y-2">
        <h3 className="text-3xl md:text-4xl font-bold font-heading text-text-title">
          {t(`login.title`)}
        </h3>
        <p className="text-text-muted font-medium text-sm">سجل دخولك لمتابعة حالتك العلاجية</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(mySubmit)}>
        <FormController
          control={control}
          name="email"
          label="البريد الإلكتروني"
          type="email"
          placeholder={t(`login.email_phone_placeholder`)}
          inputClassName={inputStyle}
        />

        <div className="space-y-2">
          <FormController
            control={control}
            name="password"
            label="كلمة المرور"
            type="password"
            placeholder={t(`login.password_placeholder`)}
            inputClassName={inputStyle}
          />
          <div className="flex justify-end">
            <Link className="text-primary font-bold text-sm hover:underline" href={"/patient/forget-password"}>
              {t(`login.forget_password`)}
            </Link>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <Button disabled={isSubmitting} type="submit" className="w-full h-14 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-base transition-all shadow-md shadow-primary/20">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <RiLoader4Line className="w-5 h-5 animate-spin" />
                {t(`login.login_btn_loading`)}
              </span>
            ) : (
              t(`login.login_btn`)
            )}
          </Button>
          
          <p className="text-center text-text-muted font-medium">
            {t(`login.no_account`)}{" "}
            <Link className="text-primary font-bold hover:underline" href={"/student/register"}>
              {t(`login.sign_up_link`)}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}