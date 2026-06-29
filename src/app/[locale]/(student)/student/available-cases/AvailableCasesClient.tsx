"use client";

import React from 'react';
import { studentAvailableCaseType } from '@/type';
import { useTranslations } from "next-intl";
import DynamicFilterWrapper, { DropdownFilter } from '@/app/_components/DynamicFilterWrapper';
import PatientCase from './patientCase';

export default function AvailableCasesClient({ casesList }: { casesList: studentAvailableCaseType[] }) {
  const t = useTranslations("studentAvailableCases");

  // إعدادات الفلاتر الخاصة بصفحة الحالات المتاحة
  const caseFilters: DropdownFilter<studentAvailableCaseType>[] = [
    {
      key: "specidRequiredSpecialization", 
      placeholder: t("filters.allSpecialties"),
      options: [
        { label: "علاج جذور", value: "علاج جذور" },
        { label: "خلع جراحي", value: "خلع جراحي" },
        // ضيف باقي التخصصات بتاعتك هنا
      ]
    }
  ];

  return (
    <DynamicFilterWrapper<studentAvailableCaseType>
      data={casesList}
      // 1. هيبحث في الـ ID والتخصص والوصف
      searchKeys={['id', 'specidRequiredSpecialization', 'description']} 
      searchPlaceholder={t("filters.searchPlaceholder")}
      // 2. الفلاتر المنسدلة
      dropdownFilters={caseFilters} 
      // 3. طريقة رسم الكارت (مفيش إيرور هنا لأننا في Client Component)
      renderItem={(caseItem) => <PatientCase key={caseItem.id} data={caseItem} />}
      // 4. رسائل الـ Empty State
      emptyStateTitle={t("filters.noResults")}
      emptyStateDesc={t("filters.searchPlaceholder")}
    />
  );
}