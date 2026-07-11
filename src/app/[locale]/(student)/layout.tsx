import { ChatBot } from "@/app/_components/ChatBot";
import ChatBotBtn from "@/app/_components/ChatBotBtn";
import Sidebar from "@/app/_components/Sidebar";
import System_navbar from "@/app/_components/System_navbar";
import PatientContext from "@/app/contexts/patientContext";
import { cookies } from "next/headers";
import React, { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
    const token = cookieStore.get("tkn")?.value || cookieStore.get("token")?.value || "";
  return (
    <main className="min-h-screen bg-[#F3F4FF]">
      <PatientContext>
        <div className="flex flex-col lg:flex-row min-h-screen w-full relative">
          <div className="w-full lg:w-70 shrink-0 z-50 relative">
            <Sidebar userType="student" token={token} /> 
          </div>

          <div className="flex-1 flex flex-col min-w-0 relative pt-24 lg:pt-0">
            <System_navbar token={token} />

            <div className="flex-1 flex justify-center w-full">{children}</div>

            <div className="fixed bottom-5 ltr:right-5 rtl:left-5 z-50">
              <ChatBot />
            </div>
          </div>
        </div>
      </PatientContext>
    </main>
  );
}
