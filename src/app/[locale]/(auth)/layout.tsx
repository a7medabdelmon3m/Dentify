"use client";
import React, { ReactNode } from "react";
import Footer from "../../_components/footer/Footer";
import AuthNav from "@/app/_components/authNav";

export default  function AuthLayout({ children }: { children: ReactNode }) {
 

  return (
    <>
      <AuthNav/>
      <main className="mt-11">{children}</main>
      <Footer />
    </>
  );
}
