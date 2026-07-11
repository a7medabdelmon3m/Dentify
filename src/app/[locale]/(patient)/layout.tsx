import { ChatBot } from "@/app/_components/ChatBot";
import ChatBotBtn from "@/app/_components/ChatBotBtn";
import GlobalRatingChecker from "@/app/_components/rating/GlobalRatingChecker";
import Sidebar from "@/app/_components/Sidebar";
import System_navbar from "@/app/_components/System_navbar";
import { apiRequest } from "@/app/api/services/denti.services";
import PatientContext from "@/app/contexts/patientContext";
import { appointmentType, patientTreatementRequest } from "@/type";
import { cookies } from "next/headers";
import React, { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("tkn")?.value || cookieStore.get("token")?.value || "";

 


  const myAppointment =  await apiRequest<appointmentType[]>('http://localhost:5123/api/Appointments/My/Patient') 
    const singleAppointment = myAppointment.data?.[0] 
  
    const myDoctor =  await apiRequest<patientTreatementRequest[]>('http://localhost:5123/api/TreatmentRequests/cases') 
    const myDoctorDetails = myDoctor.data?.[0] 

    

  const mockPendingAppointment = {
    treatmentRequestId: myDoctorDetails?.id,
    studentName: myDoctorDetails?.studentName,
    specialty: "'طالب امتياز'",
    appointmentDate:singleAppointment?.appointmentDate , 
  };
  return (
    <div>
      <main className="min-h-screen bg-[#F3F4FF] flex flex-col lg:flex-row">
        <PatientContext>
          <div className="w-full lg:w-70 shrink-0">
            <Sidebar userType="patient"  token={token}/>
          </div>

          <div className="flex-1 mt-21 lg:mt-0 relative flex flex-col min-w-0">
            <System_navbar token={token} />

            <div className="flex-1 flex justify-center w-full">
              <GlobalRatingChecker pendingRatingSession={mockPendingAppointment} />
              {children}</div>

            <div className="fixed bottom-5 ltr:right-5 rtl:left-5 z-50">
              <ChatBot />
            </div>
          </div>
        </PatientContext>
      </main>
    </div>
  );
}
