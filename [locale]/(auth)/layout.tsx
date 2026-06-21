"use client";
import React, { ReactNode } from "react";
import Footer from "../../_components/footer/Footer";
import AuthNav from "@/app/_components/authNav";

export default  function AuthLayout({ children }: { children: ReactNode }) {
 

  return (
    <>
      <AuthNav/>
      <main>{children}</main>
      <Footer />
    </>
  );
}
