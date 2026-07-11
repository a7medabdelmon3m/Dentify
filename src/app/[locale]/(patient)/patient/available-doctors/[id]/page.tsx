import Image from "next/image";

import { 
  Star, 
  Award, 
  GraduationCap, 
} from "lucide-react";

import PageHeader from "@/app/_components/PageHeader";
import doctorImg from "@/assets/images/Dr. Ahmed.png"; 
import SendEquestButton from "./SendEquestButton";
import { getTranslations } from "next-intl/server";
import ReviwesCarosoul from "./ReviwesCarosoul";
import { apiRequest } from "@/app/api/services/denti.services";
import { availableDoctorsType, studentType } from "@/type";
import doctorAvatar from '@/assets/images/doctor-avatar.webp'

export default async function DoctorInsightsPage({ params }: { params: { id: string; locale: string } }) {
  const {id:studentId} = await params
  const t = await getTranslations("DoctorInsights"); 
  const response = await apiRequest<availableDoctorsType>(`http://localhost:5123/api/Patient/students/${studentId}`)
  
  const studentDetails = response.data ;

 
  const MOCK_REVIEWS = [
    { id: 1, name: "Ahmed M.", text: "الدكتور ده ممتاز جداً وصبور، الإجراء كان بدون ألم والنتيجة رائعة، أنصح به بشدة." },
    { id: 2, name: "Sara H.", text: "عيادة نظيفة جداً واحترافية في التعامل، تجربة ممتازة." },
    { id: 3, name: "Mahmoud T.", text: "تجربة عظيمة، الطالب كان حذر جداً وبيشتغل تحت إشراف دقيق من الدكاترة الكبار." },
    { id: 4, name: "Nour A.", text: "خلع بدون ألم ومعاملة في قمة الاحترام، شكراً جداً." },
    { id: 5, name: "Khaled Y.", text: "متابعة ممتازة بعد الجلسة، واهتمام بكل التفاصيل." },
  ];
console.log('studentDetails?.profileImageUrl : ' ,studentDetails?.profileImageUrl);

  

 

  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-10 animate-in fade-in duration-500 text-rightAr">
        
        <PageHeader title={t("pageTitle")} desc={t("pageDesc")} />

        <div className="bg-white border border-border-light rounded-3xl shadow-sm flex flex-col md:flex-row gap-6 p-4 md:p-6">
          
          <div className="w-full md:w-64 lg:w-72 aspect-square relative rounded-2xl overflow-hidden shrink-0 border border-border-light shadow-sm mx-auto md:mx-0">
            <Image 
              fill 
              src={(studentDetails?.profileImageUrl ) ?? doctorAvatar } 
              alt={studentDetails?.fullName as string} 
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-between flex-1 py-2 space-y-6 md:space-y-0">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                <div className="space-y-2 text-center sm:text-start">
                  <div className="flex gap-1.5 items-center justify-center sm:justify-start text-success text-xs font-bold bg-success/10 w-fit px-2.5 py-1 rounded-full mx-auto sm:mx-0">
                    <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                    {t("statusOnline")}
                  </div>
                  
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-text-title">
                    {studentDetails?.fullName}
                  </h3>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-primary font-medium text-base sm:text-lg">
                    <Award className="w-5 h-5" />
                    <span>{t("specialty")}</span>
                  </div>
                </div>

                <div className="bg-bg-main border border-border-light px-4 py-3 rounded-2xl flex flex-col items-center justify-center min-w-30 mx-auto sm:mx-0">
                  <div className="flex gap-1 text-warning mb-1">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-warning" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-warning" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-warning" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-warning" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-warning" />
                  </div>
                  <span className="text-text-title font-bold text-base sm:text-lg">
                    {5.0} <span className="text-text-muted text-xs font-normal">({t("ratingText")})</span>
                  </span>
                </div>
              </div>

              <div className="flex justify-center sm:justify-start gap-4 pt-2">
                <div className="flex items-center gap-2 text-text-muted text-sm font-medium bg-bg-main px-4 py-2 rounded-xl border border-border-light w-full sm:w-auto justify-center">
                  <GraduationCap className="w-5 h-5 text-primary shrink-0" />
                  <span className="truncate">{t(`${studentDetails?.city}`)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border-light">
              <SendEquestButton studentId={studentId}/>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border-light rounded-3xl shadow-sm p-6 md:p-8">
          <h4 className="font-heading font-bold text-xl md:text-2xl text-text-title mb-4 border-b border-border-light pb-4">
            {t("aboutTitle")}
          </h4>
          <div className="text-text-body text-sm md:text-base leading-relaxed">
            Dr. Ahmed is a dedicated dental professional and current
            student at Beni-Suef University. With a passion for advancing
            dental techniques and patient comfort, he has focused his
            career on orthodontics and restorative dentistry. He prioritizes 
            creating a comfortable environment for all patients.
          </div>
        </div>

        <ReviwesCarosoul reviwes={MOCK_REVIEWS}/>

      </div>
    </section>
  );
}