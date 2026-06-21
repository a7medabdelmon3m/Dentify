'use client'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function ErrorMasseage() {
    const t = useTranslations('auth.forgot_password')
  return (
    <div className="flex items-center gap-3 p-4 bg-red-50 border border-danger/20 rounded-lg animate-in slide-in-from-top-2">
    <svg className="w-5 h-5 text-danger shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p className="text-danger font-medium text-sm">
      {t("status_msgs.error_message")}
    </p>
  </div>
  )
}
