import React, { ReactNode } from "react";
import { NavigationMenuDemo } from "../../_components/navbar/Navbar";
import Footer from "../../_components/footer/Footer";

export default function LandingLayout({ children }:{children:ReactNode}) {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-10">
        <NavigationMenuDemo></NavigationMenuDemo>
      </div>
      <main>{children}</main>
       <Footer />
    </>
  );
}
