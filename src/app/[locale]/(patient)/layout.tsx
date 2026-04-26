import { ChatBot } from "@/app/_components/ChatBot";
import ChatBotBtn from "@/app/_components/ChatBotBtn";
import Sidebar from "@/app/_components/Sidebar";
import System_navbar from "@/app/_components/System_navbar";
import PatientContext from "@/app/contexts/patientContext";
import React, { Children, ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <main className="min-h-screen flex flex-col lg:flex-row">
        <PatientContext>
         
          <Sidebar userType="patient" />
          <div className="flex-1 relative! ">
            <System_navbar />
            {children}
            <div className="fixed bottom-5 right-5 z-10">
              <ChatBot  />
            </div>
          </div>
        </PatientContext>
      </main>
    </div>
  );
}
