"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter, FolderOpen } from "lucide-react";
import EmptyState from "@/app/_components/EmptyState";
import { useParams } from "next/navigation";

export interface DropdownFilter<T> {
  key: keyof T; 
  placeholder: string; 
  options: { label: string; value: string }[]; 
}

interface DynamicFilterWrapperProps<T> {
  data: T[]; 
  searchKeys: (keyof T)[]; 
  searchPlaceholder?: string;
  dropdownFilters?: DropdownFilter<T>[]; 
  renderItem?: (item: T, index: number) => React.ReactNode; 
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
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = data.filter((item) => {
    const searchString = searchKeys
      .map((key) => String(item[key] || ""))
      .join(" ")
      .toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
   

    const matchesDropdowns = dropdownFilters.every((filter) => {
      const selectedValue = activeFilters[filter.key as string];
      if (!selectedValue) return true;
      return String(item[filter.key]) === selectedValue;
    });

    return matchesSearch && matchesDropdowns;
  });
 const {locale} = useParams()

 
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 bg-white p-4 rounded-2xl border border-border-light shadow-sm">
        
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

      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in duration-500">
          {filteredData.map((item, index) => renderItem?.(item, index))}
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