import { ChatBot } from "@/app/_components/ChatBot";
import ChatBotBtn from "@/app/_components/ChatBotBtn";
import Sidebar from "@/app/_components/Sidebar";
import System_navbar from "@/app/_components/System_navbar";
import PatientContext from "@/app/contexts/patientContext";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Container الأساسي */}
      <main className="min-h-screen bg-[#F3F4FF] flex flex-col lg:flex-row">
        <PatientContext>
          
          {/* Sidebar */}
          {/* ضفنا shrink-0 عشان السايدبار يحافظ على حجمه وما يتضغطش */}
          <div className="w-full lg:w-70 shrink-0">
            <Sidebar userType="patient" />
          </div>

          {/* Main Content Area */}
          {/* حولنا الحاوية دي لـ flex-col عشان نوزع المساحة الطولية صح */}
          <div className="flex-1 mt-21 lg:mt-0 relative flex flex-col min-w-0">
            
            <System_navbar />

            {/* Content Wrapper */}
            {/* شيلنا min-h-screen وحطينا flex-1 عشان يملى المساحة المتبقية تحت النافبار بس */}
            <div className="flex-1 flex justify-center w-full">
              {children}
            </div>

            {/* Chatbot */}
            <div className="fixed bottom-5 right-5 z-10">
              <ChatBot />
            </div>

          </div>

        </PatientContext>
      </main>
    </div>
  );
}