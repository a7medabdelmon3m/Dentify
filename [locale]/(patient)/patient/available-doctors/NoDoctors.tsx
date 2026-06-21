import React from 'react'
import { UserX, FilePlus2 } from "lucide-react"; // أيقونات معبرة للحالتين
import { getTranslations } from 'next-intl/server';
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  // بنحدد الحالات الممكنة، والافتراضي هو مفيش دكاترة
  variant?: "no-doctors" | "no-case";
}

export default async function EmptyDoctorsState({ variant = "no-doctors" }: EmptyStateProps) {
  const t = await getTranslations('available-doctors.emptyStates');

  // تحديد المتغيرات بناءً على الـ variant
  const isNoCase = variant === "no-case";
  const Icon = isNoCase ? FilePlus2 : UserX; // تغيير الأيقونة دايناميك

  return (
    <div className=" my- flex flex-col items-center justify-center min-h-[50vh] w-full p-6 text-center animate-in fade-in duration-500">
      
      {/* حاوية الأيقونة - متناسقة مع HCI المشروع */}
      <div className="flex items-center justify-center w-20 h-20 bg-bg-main border border-border-light rounded-2xl mb-6 shadow-sm">
        <Icon className="w-10 h-10 text-text-muted opacity-80" />
      </div>

      {/* المحتوى النصي (توسيط ومسافات مريحة للعين) */}
      <div className="max-w-md space-y-3">
        <h3 className="font-heading font-bold text-xl text-text-title tracking-tight">
          {t(`${variant}.title`)}
        </h3>
        <p className="text-sm text-text-muted font-medium leading-relaxed">
          {t(`${variant}.description`)}
        </p>
      </div>

      {/* زرار اتخاذ الإجراء (بيظهر بس لو المريض محتاج يكريت حالة) */}
      {isNoCase && (
        <div className="mt-8">
          <Button asChild className="rounded-xl bg-primary hover:bg-primary-hover text-white font-heading font-bold px-8 py-6 h-auto shadow-sm transition-all duration-200">
            <Link href="/patient/create-case">
              {t(`${variant}.actionBtn`)}
            </Link>
          </Button>
        </div>
      )}
      
    </div>
  )
}