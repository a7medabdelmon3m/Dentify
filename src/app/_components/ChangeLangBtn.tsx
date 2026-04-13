"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { GrLanguage } from "react-icons/gr";

export default function LanguageChanger() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale; 

  const toggleLanguage = () => {
    const nextLocale = currentLocale === "ar" ? "en" : "ar";
    
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      onClick={toggleLanguage}
      className=" flex gap-2 px-4 py-2 border rounded-lg text-text-black bg-primary-subtle border-primary  hover:bg-primary-hover hover:text-white transition-colors"
    >
        <GrLanguage />
        {currentLocale === "ar" ? <span>EN</span> : <span>AR</span>}
      

    </Button>
  );
}