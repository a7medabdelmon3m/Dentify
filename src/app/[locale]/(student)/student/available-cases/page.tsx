import React from 'react';
import { apiRequest } from '@/app/api/services/denti.services';
import { studentAvailableCaseType, studentTreatementRequest } from '@/type';
import { getTranslations } from 'next-intl/server';
import EmptyState from '@/app/_components/EmptyState';
import PageHeader from '@/app/_components/PageHeader';
import { FaFolderOpen } from 'react-icons/fa6';
import AvailableCasesClient from './AvailableCasesClient'; 
import { FaCheck } from 'react-icons/fa';

export default async function Page() {
  const t = await getTranslations("studentAvailableCases");
  const casesData = await apiRequest<studentAvailableCaseType[]>('http://localhost:5123/api/Case/available');
  const casesList = casesData.data;
   const myAcceptedTreateMentRequest = await apiRequest<studentTreatementRequest[]>(`http://localhost:5123/api/TreatmentRequests/my/student`);
    const myTreatmentData = myAcceptedTreateMentRequest.data?.[0]; 

  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
      
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
        ) : myTreatmentData ? (
          <EmptyState 
            icon={<FaCheck />} 
            title={'لديك مريض بالفعل'} 
            description={`تم تعيين المريض ${myTreatmentData.patientName} اليك`} 
          />
        ): (
          <AvailableCasesClient casesList={casesList} />
        )}
        
      </div>
    </section>
  );
}