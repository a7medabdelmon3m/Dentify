import React from 'react';
import { apiRequest } from '@/app/api/services/denti.services';
import { studentAvailableCaseType } from '@/type';
import { getTranslations } from 'next-intl/server';
import EmptyState from '@/app/_components/EmptyState';
import PageHeader from '@/app/_components/PageHeader';
import { FaFolderOpen } from 'react-icons/fa6';
import AvailableCasesClient from './AvailableCasesClient'; 

export default async function Page() {
  const t = await getTranslations("studentAvailableCases");
  const casesData = await apiRequest<studentAvailableCaseType[]>('http://localhost:5123/api/Case/available');
  const casesList = casesData.data;

  return (
    // 1. الهيكل الخارجي الموحد (نفس المسافات في كل الموقع)
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
      
      {/* 2. الحاوية الداخلية (هنا اديناها 7xl عشان دي شبكة كروت محتاجة مساحة) */}
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        <PageHeader 
          title={t("header.title")} 
          desc={t("header.description")} 
        />

        {!casesList || casesList.length === 0 ? (
          <EmptyState 
            icon={<FaFolderOpen />} 
            title={t("studentEmptyStates.availableCases.title")} 
            description={t("studentEmptyStates.availableCases.description")} 
          />
        ) : (
          <AvailableCasesClient casesList={casesList} />
        )}
        
      </div>
    </section>
  );
}