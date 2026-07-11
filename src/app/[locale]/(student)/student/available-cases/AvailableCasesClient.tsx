"use client";

import React from 'react';
import { studentAvailableCaseType } from '@/type';
import { useTranslations } from "next-intl";
import DynamicFilterWrapper, { DropdownFilter } from '@/app/_components/DynamicFilterWrapper';
import PatientCase from './patientCase';
import { dentalDiseases } from '@/app/constants/diseases';

export default function AvailableCasesClient({ casesList }: { casesList: studentAvailableCaseType[] }) {
  const t = useTranslations("studentAvailableCases");
  const d = useTranslations("nonNumber_diseases");

  const caseFilters: DropdownFilter<studentAvailableCaseType>[] = [
    {
      key: "specidRequiredSpecialization", 
      placeholder: t("filters.allSpecialties"),
      options: dentalDiseases.map(disease => 
        
         ({ label: d(disease.label), value: String(disease.value) })) }
  ];

  return (
    <DynamicFilterWrapper<studentAvailableCaseType>
      data={casesList}
      searchKeys={['id', 'specidRequiredSpecialization', 'description']} 
      searchPlaceholder={t("filters.searchPlaceholder")}
      dropdownFilters={caseFilters} 
      renderItem={(caseItem) => <PatientCase key={caseItem.id} data={caseItem} />}
      emptyStateTitle={t("filters.noResults")}
      emptyStateDesc={t("filters.searchPlaceholder")}
    />
  );
}