"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";
import { BsClipboardPlusFill } from "react-icons/bs";
import { FaBars, FaBriefcaseMedical, FaHandHoldingHeart, FaRegEnvelope } from "react-icons/fa";
import { FaUserDoctor, FaXmark } from "react-icons/fa6";
import { GoGear } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { IoIosCreate } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

export type prop = {
  userType: string;
};

// الأوبجكت الكبير بتنظيم اسم الكومبوننت
const translations = {
  en: {
    Sidebar: {
      dashboard: "Dashboard",
      createCase: "Create Case",
      myCases: "My Cases",
      availableDoctors: "Available Doctors",
      careProposals: "Care Proposals"
    },
    // هنا مستقبلاً تقدر تضيف بقية الصفحات
    // Home: { ... }
  },
  ar: {
    Sidebar: {
      dashboard: "لوحة التحكم",
      createCase: "إضافة حالة",
      myCases: "حالاتي المرضية",
      availableDoctors: "الأطباء المتاحين",
      careProposals: "عروض الأطباء"
    }
  }
};

const activeStyle = "bg-[#F3F4FF] text-text-body";

export default function Sidebar({ userType }: prop) {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const { locale } = useParams();

  // الوصول لنصوص السايد بار بناءً على اللغة
  const t = (translations[locale as keyof typeof translations] || translations.en).Sidebar;

  const patientItems = [
    { title: t.dashboard, url: `/${locale}/patient/dashboard`, icon: <MdDashboard /> },
    { title: t.createCase, url: `/${locale}/patient/dashboard`, icon: <IoIosCreate /> },
    { title: t.myCases, url: `/${locale}/patient/cases`, icon: <FaBriefcaseMedical /> },
    {
      title: t.availableDoctors,
      url: `/${locale}/patient/available-doctors`,
      icon: <FaUserDoctor />,
    },
    {
      title: t.careProposals,
      url: `/${locale}/patient/proposals`,
      icon: <FaHandHoldingHeart />,
    },
  ];

  return (
    <aside className=" sticky top-0 lg:h-screen z-6 w-full lg:w-70 bg-primary py-4  lg:py-12.5  ">
      <div className="flex justify-between items-center">
        <h1 className="text-white px-4 text-4xl font-bold font-heading text-start lg:text-center ">
          Dentify
        </h1>
        <div className=" flex items-center gap-3 lg:hidden">
          <div className="relative flex justify-center items-center bg-transparent shadow-md shadow-[#BF156C0D] w-10 h-10 rounded-full text-2xl text-white cursor-pointer">
            <IoNotificationsOutline />
            <div className="w-2 h-2 rounded-full bg-red-700 absolute top-1 right-1"></div>
          </div>
          <div className="relative flex justify-center items-center bg-transparent shadow-md shadow-[#BF156C0D] w-10 h-10 rounded-full text-2xl text-white cursor-pointer">
            <FaRegEnvelope />
            <div className="w-2 h-2 rounded-full bg-red-700 absolute top-1 right-1"></div>
          </div>
          <div
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="p-3 text-white text-2xl lg:hidden"
          >
            {isOpen ? <FaXmark /> : <FaBars />}
          </div>
        </div>
      </div>

      <ul
        className={`px-6 lg:p-0 lg:ps-6 space-y-2 mt-11.5 ${isOpen ? "block" : "hidden"} lg:block`}
      >
        {patientItems.map((item, idx) => {
          const isActive = pathName.includes(item.url);
          
          return (
            <li key={idx}>
              <Link
                className={` ${isActive ? activeStyle : 'text-[#F2F2F7]'} flex items-center rounded-[40px] lg:rounded-e-none py-3 px-4 gap-6  text-lg font-medium hover:bg-[#F3F4FF] hover:text-text-body transition-colors`}
                href={item.url}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}