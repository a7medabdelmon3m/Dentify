import React, { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode; // بنستقبل الأيقونة كـ Prop
  title: string;
  description: string;
  actionButton?: ReactNode; // اختياري
}

export default function EmptyState({
  icon,
  title,
  description,
  actionButton,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col  items-center justify-center min-h-[50vh] w-full p-6 text-center animate-in fade-in zoom-in-95 duration-500">
      
      {/* ── حاوية الأيقونة (تصميم هادي ومريح للعين) ── */}
      {/* استخدمنا [&>svg] عشان نفرض الحجم واللون على أي أيقونة تتباصى */}
      <div className="flex items-center justify-center w-24 h-24 bg-primary-subtle/50 border border-primary/10 rounded-[2rem] mb-6 shadow-sm [&>svg]:w-10 [&>svg]:h-10 [&>svg]:text-primary [&>svg]:opacity-80">
        {icon}
      </div>

      {/* ── المحتوى النصي ── */}
      <div className="max-w-md space-y-3">
        <h3 className="font-heading font-bold text-2xl text-text-title tracking-tight">
          {title}
        </h3>
        <p className="text-base text-text-muted font-medium leading-relaxed">
          {description}
        </p>
      </div>

      {/* ── الزرار الاختياري ── */}
      {actionButton && (
        <div className="mt-8">
          {actionButton}
        </div>
      )}
      
    </div>
  );
}