"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter, FolderOpen } from "lucide-react";
import EmptyState from "@/app/_components/EmptyState";
import { useParams } from "next/navigation";

// 1. تعريف الأنواع (Types)
export interface DropdownFilter<T> {
  key: keyof T; // المفتاح اللي هنفلتر بيه في الداتا
  placeholder: string; // الكلمة اللي هتظهر (مثال: كل التخصصات)
  options: { label: string; value: string }[]; // خيارات الفلتر
}

interface DynamicFilterWrapperProps<T> {
  data: T[]; // الداتا اللي جاية من الباك إيند
  searchKeys: (keyof T)[]; // المفاتيح اللي هنبحث فيها (زي الاسم، الوصف، الخ)
  searchPlaceholder?: string;
  dropdownFilters?: DropdownFilter<T>[]; // مصفوفة بالفلاتر المنسدلة
  renderItem: (item: T, index: number) => React.ReactNode; // دالة لرسم الكارت
  emptyStateTitle?: string;
  emptyStateDesc?: string;
}

export default function DynamicFilterWrapper<T extends Record<string, any>>({
  data,
  searchKeys,
  searchPlaceholder = "ابحث هنا...",
  dropdownFilters = [],
  renderItem,
  emptyStateTitle = "لا توجد نتائج",
  emptyStateDesc = "لم يتم العثور على أي بيانات مطابقة لبحثك.",
}: DynamicFilterWrapperProps<T>) {
  
  // States
  const [searchTerm, setSearchTerm] = useState("");
  // State يحفظ قيمة كل فلتر منسدل بناءً على الـ key بتاعه
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  // دالة لتحديث الفلاتر المنسدلة
  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  // 2. لوجيك الفلترة الديناميكي
  const filteredData = data.filter((item) => {
    // أ. الفلترة بالبحث النصي
    const searchString = searchKeys
      .map((key) => String(item[key] || ""))
      .join(" ")
      .toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
   

    // ب. الفلترة بالقوائم المنسدلة
    const matchesDropdowns = dropdownFilters.every((filter) => {
      const selectedValue = activeFilters[filter.key as string];
      // لو اليوزر مش مختار حاجة من الفلتر ده، عديها
      if (!selectedValue) return true;
      // لو مختار، قارن القيمة باللي في الداتا
      return String(item[filter.key]) === selectedValue;
    });

    return matchesSearch && matchesDropdowns;
  });
 const {locale} = useParams()

//  console.log('locale : ', locale);
 
  return (
    <div className="space-y-6">
      
      {/* ── شريط الفلترة والبحث ── */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 bg-white p-4 rounded-2xl border border-border-light shadow-sm">
        
        {/* مربع البحث */}
        <div className="relative flex-1 min-w-62.5">
          <Search className={`absolute ${locale === 'ar' ? 'left-3' : 'right-3'}  top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted ` }/>
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pe-10 bg-bg-main border-none rounded-xl h-12 text-base focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        {/* الفلاتر المنسدلة الديناميكية */}
        {dropdownFilters.map((filter, index) => (
          <div key={index} className="relative min-w-50 flex-1 sm:flex-none">
            <Filter className={`absolute ${locale === 'ar' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted z-10`} />
            <select
                aria-label = 'filter by case type '
              value={activeFilters[filter.key as string] || ""}
              onChange={(e) => handleFilterChange(filter.key as string, e.target.value)}
              className="w-full appearance-none bg-bg-main border-none rounded-xl h-12 pe-10 ps-4 text-base text-text-title font-medium focus:ring-1 focus:ring-primary outline-none cursor-pointer"
            >
              <option value="">{filter.placeholder}</option>
              {filter.options.map((opt, i) => (
                <option key={i} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* ── عرض الداتا ── */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in duration-500">
          {/* بنستخدم الـ renderItem عشان نرسم الكارت اللي اتبعتلنا */}
          {filteredData.map((item, index) => renderItem(item, index))}
        </div>
      ) : (
        <div className="pt-8">
          <EmptyState
            icon={<FolderOpen className="w-12 h-12" />}
            title={emptyStateTitle}
            description={emptyStateDesc}
          />
        </div>
      )}
    </div>
  );
}