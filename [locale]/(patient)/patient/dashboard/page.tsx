import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import PageHeader from "@/app/_components/PageHeader";
import MiniProfile from "@/app/_components/miniProfile";
import CaseCard from "@/app/_components/CaseCard";
import { apiRequest } from "@/app/api/services/denti.services";
import NoCaseCard from "./NoCaseCard";
import { patientCaseType } from "@/type";
import SelectedDoctor from "./SelectedDoctor";
import NextAppointment from "./NextAppointment";
// import { cookies } from "next/headers";



// ─── Main Component ──────────────────────────────────────────────────────────

export default async function DentoryDashboard() {
  const t = await getTranslations("PatientDashboard");
  const c = await getTranslations("cases.MyCasesPage");

  // ─── Data ────────────────────────────────────────────────────────────────────

  const myCase = await apiRequest<patientCaseType[]>('http://localhost:5123/api/Case/my-cases');
  const singleCase: patientCaseType | undefined = myCase.data && myCase.data?.length > 0 ? myCase.data[0] : undefined;
  // console.log("myCase :", myCase);
  
 

  const hasSelectedDoctor = true; // نعم، تم اختيار الطالب
  const hasAppointment = true;     // نعم، تم تحديد الموعد

  const appData = hasAppointment ? {
    appointmentDate: "2026-06-09T17:30:00.000Z", // 7:30 PM
    location: "عيادة الجامعة، الدور الـ 2",
  } : null;

  const doctorName = hasSelectedDoctor ? "أحمد محمد محمود" : null;
  

  return (
    <div className="container p-4 mx-auto space-y-4">
      <PageHeader title={t(`title`)} desc={t(`description`)}/>
    
     <MiniProfile/>
      <section className="space-y-4 mb-8">
        <h3 className="text-2xl font-heading font-bold text-primary">{c(`title`)}</h3>
        {singleCase? <CaseCard caseData={singleCase}/> :<NoCaseCard/> }
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6"> {/* gap-6 = 24px، أقصى مسافة مسموحة */}
          
          {/* كارد الدكتور المختار للمعلجة */}
          <div className="h-full">
            <SelectedDoctor doctorName={doctorName} />
          </div>

          {/* كارد الموعد القادم */}
          <div className="h-full">
            <NextAppointment 
              appointmentDate={appData?.appointmentDate ?? null} 
              location={appData?.location ?? null} 
            />
          </div>
          </div>
      </section>
     
    </div>
  );
}