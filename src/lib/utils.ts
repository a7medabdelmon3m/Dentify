import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(dateString: string | Date, locale: string = 'ar'): string {
  if (!dateString) return "";

  const pastDate = new Date(dateString);
  const currentDate = new Date();
  
  const diffInSeconds = Math.floor((currentDate.getTime() - pastDate.getTime()) / 1000);

  if (isNaN(diffInSeconds)) return "";
  
  // 1. التعامل مع "دلوقتي" باللغة العربية
  if (diffInSeconds < 5) return locale === 'ar' ? "الآن" : "just now";

  const maxSeconds = 7 * 86400;

  // 2. التاريخ الطويل
  if (diffInSeconds > maxSeconds) {
    return pastDate.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // 3. استخدام الـ Locale اللي جاي من الـ Parameter
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const units = {
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  } as const;

  for (const unit of Object.keys(units) as Array<keyof typeof units>) {
    if (diffInSeconds >= units[unit] || unit === 'second') {
      const value = Math.floor(diffInSeconds / units[unit]);
      return rtf.format(-Math.trunc(value), unit);
    }
  }

  return locale === 'ar' ? "الآن" : "just now";
}