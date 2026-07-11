import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import PageHeader from "@/app/_components/PageHeader";
import MiniProfile from "@/app/_components/miniProfile";
import CaseCard from "@/app/_components/CaseCard";
import { apiRequest } from "@/app/api/services/denti.services";
import NoCaseCard from "./NoCaseCard";
import { appointmentType, patientCaseType, patientTreatementRequest } from "@/type";
import SelectedDoctor from "./SelectedDoctor";
import NextAppointment from "./NextAppointment";




export default async function DentoryDashboard() {
  const t = await getTranslations("PatientDashboard");
  const c = await getTranslations("cases.MyCasesPage");


  const myCase = await apiRequest<patientCaseType[]>('http://localhost:5123/api/Case/my-cases');
  const singleCase: patientCaseType | undefined = myCase.data && myCase.data?.length > 0 ? myCase.data[0] : undefined;
  console.log("myCase :", myCase);
  

  const myAppointment =  await apiRequest<appointmentType[]>('http://localhost:5123/api/Appointments/My/Patient') 
  const singleAppointment = myAppointment.data?.[0] 

  const myDoctor =  await apiRequest<patientTreatementRequest[]>('http://localhost:5123/api/TreatmentRequests/cases') 
  const myDoctorDetails = myDoctor.data?.[0] 



  

  return (
    <div className="container p-4 mx-auto space-y-4">
      <PageHeader title={t(`title`)} desc={t(`description`)}/>
      
    
     <MiniProfile/>
      <section className="space-y-4 mb-8">
        <h3 className="text-2xl font-heading font-bold text-primary">{c(`title`)}</h3>
        {singleCase? <CaseCard caseData={singleCase}/> :<NoCaseCard/> }
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6"> {/* gap-6 = 24px، أقصى مسافة مسموحة */}
          
          <div className="h-full">
            <SelectedDoctor doctorName={myDoctorDetails?.studentName ?? null} />
          </div>

          <div className="h-full">
            <NextAppointment appointment={singleAppointment ?? null} />
          </div>
          </div>
      </section>
     
    </div>
  );
}