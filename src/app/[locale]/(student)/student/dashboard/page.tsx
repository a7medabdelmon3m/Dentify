import React, { Suspense } from 'react'
import MiniProfile from '@/app/_components/miniProfile'

import TargetedCasesCard from './TargetedCasesCard'
import CurrentPatientCard from './CurrentPatientCard'
import NextAppointmentCard from './NextAppointmentCard'
import { apiRequest } from '@/app/api/services/denti.services'
import { appointmentType, profileType, studentTreatementRequest } from '@/type'

const CardSkeleton = () => (
  <div className="h-64 bg-white border border-border-light rounded-3xl animate-pulse p-6">
    <div className="w-12 h-12 bg-slate-200 rounded-2xl mb-4"></div>
    <div className="w-1/2 h-5 bg-slate-200 rounded mb-4"></div>
    <div className="w-full h-20 bg-slate-100 rounded-xl"></div>
  </div>
);


export default async function StudentDashboard() {
const response  = await apiRequest<studentTreatementRequest[]>(`http://localhost:5123/api/TreatmentRequests/my/student`)
console.log('response : ' , response.data);

const firstPatient = response?.data && response.data.length > 0 ? response.data[0] : null;

  const myPatient = {
    'patientName': firstPatient?.patientName || '',
    'city': firstPatient?.city || '',
    'caseDescription': firstPatient?.caseDescription || '',
  }
  
const caseTypes = await apiRequest<profileType>(`http://localhost:5123/api/Account/profile`)
const caseTypeData = caseTypes.data?.specializations ?? []

const appointment = await apiRequest<appointmentType[]>(`http://localhost:5123/api/Appointments/My/Student`)
const singleAppointment = appointment.data?.[0] 


  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <MiniProfile userType='student'/>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          
          <Suspense fallback={<CardSkeleton />}>
            <TargetedCasesCard caseType ={caseTypeData}  />
          </Suspense>

          <Suspense fallback={<CardSkeleton />}>
            <CurrentPatientCard myPatient={myPatient}  />
          </Suspense>

          <Suspense fallback={<CardSkeleton />}>
            <NextAppointmentCard appointment={singleAppointment as appointmentType} />
          </Suspense>

        </div>
      </div>
    </section>
  )
}