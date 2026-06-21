import Image from "next/image";
import me from "@/assets/images/patient.jpg"; // صورة مؤقتة
import React from "react";
// توحيد الأيقونات من fa6 للحفاظ على الستايل
import { FaPhone, FaEnvelope, FaUserDoctor } from "react-icons/fa6";
import { getTranslations } from "next-intl/server";
import { ServerError } from "./errors/ServerError";
import { ErrorMessage } from "./errors/ErrorMessage";
import { redirect } from "next/navigation";
import { apiRequest } from "../api/services/denti.services";
import { userProfileType } from "@/type";

export default async function MiniProfile({
  userType = "Patient",
}: {
  userType?: string;
}) {
  const s = await getTranslations("PatientProfile");
  const response = await apiRequest<userProfileType>('http://localhost:5123/api/Account/profile');

  if (!response.success) {
    if (response.status === 401) {
      redirect("/login");
    }
    if (response.status === 500) {
      return <ServerError />;
    }
    return <ErrorMessage />;
  }

  // التأكد من الرول لعرض الأيقونة واللون المناسب
  const isDoctor = userType !== response.data?.role;

  return (
    // الكارت الأساسي: border ناعم، shadow خفيف، وانحناءات مودرن
    <div className="bg-white border border-border-light rounded-3xl overflow-hidden shadow-sm mb-10 transition-all hover:shadow-md duration-300">
      
      {/* الـ Cover: هادي ومريح للعين بألوان البراند */}
      <div className="bg-gradient-to-r from-primary to-primary-hover h-32 md:h-40 relative overflow-hidden">
        {/* أشكال هندسية ناعمة في الخلفية للجماليات */}
        <div className="absolute w-64 h-64 rounded-full bg-white/10 -top-10 -right-10 blur-2xl"></div>
        <div className="absolute w-40 h-40 rounded-full bg-black/5 -bottom-10 -left-10 blur-xl"></div>
      </div>

      <div className="relative px-6 pb-8 md:px-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* الجزء الأول: الصورة والاسم (Personal Info) */}
          <div className="relative flex flex-col items-center lg:items-start -mt-16 md:-mt-20 lg:w-1/3">
            {/* الصورة (Avatar) */}
            <div className="w-32 h-32 md:w-36 md:h-36 relative rounded-full overflow-hidden border-4 md:border-[6px] border-white shadow-md bg-white">
              <Image fill className="object-cover" src={me} alt={response.data?.fullName || "User Profile"} />
            </div>
            
            {/* الاسم والرول */}
            <div className="mt-4 flex flex-col items-center lg:items-start text-center lg:text-start">
              <h3 className="text-text-title text-2xl md:text-3xl font-bold font-heading line-clamp-1">
                {response.data?.fullName}
              </h3>
              
              {/* شارة الدور (Role Badge) */}
              <div className="flex items-center gap-1.5 mt-2 px-4 py-1.5 bg-primary-subtle text-primary rounded-full border border-primary/10">
                {isDoctor && <FaUserDoctor className="w-3.5 h-3.5" />}
                <span className="text-sm font-bold tracking-wide">
                  {!isDoctor ? s("userRole") : "Doctor"}
                </span>
              </div>
            </div>
          </div>

          {/* الجزء الثاني: بيانات التواصل (Contact Info Cards) */}
          <div className="flex-1 flex flex-col sm:flex-row gap-4 lg:gap-6 lg:mt-8">
            
            {/* كارت رقم الهاتف */}
            <div className="flex items-center gap-4 bg-bg-main p-4 md:p-5 rounded-2xl border border-border-light flex-1 shadow-sm hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-white border border-border-light rounded-full text-primary shadow-sm">
                <FaPhone className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-rightAr">
                <span className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">
                  {s("phoneLabel")}
                </span>
                <span className="text-sm md:text-base text-text-title font-extrabold" dir="ltr">
                  {response.data?.phoneNumber || "—"}
                </span>
              </div>
            </div>

            {/* كارت البريد الإلكتروني */}
            <div className="flex items-center gap-4 bg-bg-main p-4 md:p-5 rounded-2xl border border-border-light flex-1 shadow-sm hover:border-primary/30 transition-colors overflow-hidden">
              <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-white border border-border-light rounded-full text-primary shadow-sm">
                <FaEnvelope className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-rightAr overflow-hidden">
                <span className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">
                  {s("emailLabel")}
                </span>
                <span className="text-sm md:text-base text-text-title font-extrabold truncate">
                  {response.data?.email || "—"}
                </span>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}