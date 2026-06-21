import { ChatBot } from "@/app/_components/ChatBot";
import ChatBotBtn from "@/app/_components/ChatBotBtn";
import Sidebar from "@/app/_components/Sidebar";
import System_navbar from "@/app/_components/System_navbar";
import PatientContext from "@/app/contexts/patientContext";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    // شيلنا الـ flex من هنا عشان لو الـ Context بيعمل div في النص ميبوظش التوزيع
    <main className="min-h-screen bg-[#F3F4FF]">
      <PatientContext>
        
        {/* نقلنا الـ flex هنا لضمان إن التوزيع يطبق مباشرة على السايدبار والمحتوى */}
        <div className="flex flex-col lg:flex-row min-h-screen w-full relative">
          
          {/* Sidebar Wrapper */}
          {/* استخدمنا z-50 عشان السايدبار يفضل دايماً فوق المحتوى، و shrink-0 عشان ما يتضغطش */}
          <div className="w-full lg:w-70 shrink-0 z-50 relative">
            <Sidebar userType="student" /> {/* هنا userType student زي ما هي */}
          </div>

          {/* Main Content Area */}
          {/* ضفنا pt-24 في الموبايل عشان نزق المحتوى بعيد عن السايدبار، ولغيناها lg:pt-0 في الشاشات الكبيرة */}
          <div className="flex-1 flex flex-col min-w-0 relative pt-24 lg:pt-0">
            
            <System_navbar />

            {/* Content Wrapper */}
            {/* شيلنا min-h-screen وحطينا flex-1 عشان يملى المساحة المتبقية تحت النافبار بس وميعملش سكرول وهمي */}
            <div className="flex-1 flex justify-center w-full">
              {children}
            </div>

            <div className="fixed bottom-5 right-5 z-40">
              <ChatBot />
            </div>

          </div>
        </div>

      </PatientContext>
    </main>
  );
}