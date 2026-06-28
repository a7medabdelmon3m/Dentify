import React from 'react';
import PatientCase from './patientCase';
import { apiRequest } from '@/app/api/services/denti.services';
import { studentAvailableCaseType } from '@/type';
import { getTranslations } from 'next-intl/server';
import EmptyState from '@/app/_components/EmptyState';
import { FaFolderOpen } from 'react-icons/fa';

export default async function Page() {
  const t = await getTranslations("studentAvailableCases.studentEmptyStates.availableCases");
  const casesData = await apiRequest<studentAvailableCaseType[]>('http://localhost:5123/api/Case/available');
  const casesList = casesData.data;
  
  console.log('casesData : ' , casesData);

  // حماية إضافية لو الداتا مجاتش أو المصفوفة فاضية
  if (!casesList || casesList.length === 0) {
    return (
      <EmptyState 
        icon={<FaFolderOpen />} 
        title={t("title")} 
        description={t("description")} 
      />
    );
  }

  return (
    <div className='container p-4 mx-auto '>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {casesList.map(item => <PatientCase key={item.id} data={item} />)}            
        </div>
    </div>
  );
}