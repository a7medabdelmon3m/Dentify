'use client'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function SuccessMessage() {
    const router = useRouter() ;
    const t = useTranslations('auth.forgot_password')
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-in fade-in zoom-in duration-500">
    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-100">
      <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 className="text-3xl font-heading font-bold text-text-title mb-3">
      {t("status_msgs.success_title")}
    </h2>
    <p className="text-text-muted max-w-sm mb-8">
      {t("status_msgs.success_message")}
    </p>
    <Button 
      onClick={() => router.push("/student/login")}
      className="bg-primary hover:bg-primary-hover px-10 py-6 rounded-full font-medium text-white"
    >
      {t("status_msgs.back_to_login")}
    </Button>
  </div>
  )
}
