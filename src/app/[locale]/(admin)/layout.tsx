import System_navbar from "@/app/_components/System_navbar";
import { cookies } from "next/headers";
import React, { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
   const cookieStore = await cookies();
    const token = cookieStore.get("tkn")?.value || cookieStore.get("token")?.value || "";
  
  return (
    <main className="min-h-screen bg-[#F3F4FF] flex flex-col">
      <System_navbar  token={token}/>

      <div className="flex-1 flex justify-center w-full">
        {children}
      </div>
    </main>
  );
}