"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";
import { BsClipboardPlusFill } from "react-icons/bs";
import {
  FaBars,
  FaBriefcaseMedical,
  FaHandHoldingHeart,
  FaRegEnvelope,
} from "react-icons/fa";
import { FaUserDoctor, FaXmark } from "react-icons/fa6";
import { GoGear } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { IoIosCreate } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import SearchInput from "./SearchInput";
import { NotificationMenu } from "./menus/NotificationsMenu";
import { MessagesMenu } from "./menus/messagesMenu";
import { UserMenu } from "./menus/UserMenu";
import { Link } from "@/i18n/navigation";
// import { Link } from "@/i18n/navigation";

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
      careProposals: "Care Proposals",
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
      careProposals: "عروض الأطباء",
    },
  },
};

const activeStyle = "bg-[#F3F4FF] text-text-body";

export default function Sidebar({ userType }: prop) {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const { locale } = useParams();
  console.log('pathName : ' , pathName);
  console.log('locale : ' , locale);
  

  const t = (
    translations[locale as keyof typeof translations] || translations.en
  ).Sidebar;

  const patientItems = [
    {
      title: t.dashboard,
      url: `/patient/dashboard`,
      icon: <MdDashboard />,
    },
    {
      title: t.createCase,
      url: `/patient/create-case`,
      icon: <IoIosCreate />,
    },
    {
      title: t.myCases,
      url: `/patient/myCases`,
      icon: <FaBriefcaseMedical />,
    },
    {
      title: t.availableDoctors,
      url: `/patient/available-doctors`,
      icon: <FaUserDoctor />,
    },
    {
      title: t.careProposals,
      url: `/patient/proposals`,
      icon: <FaHandHoldingHeart />,
    },
  ];

  return (
    <aside className=" sticky top-0 lg:h-screen z-6 w-full lg:w-70 bg-primary py-4    ">
      <div className="flex justify-between items-center">
        <h1 className="text-white px-4 text-4xl font-bold font-heading text-start lg:text-center ">
          Dentify
        </h1>
        <div className=" flex items-center gap-3 lg:hidden">
          <div className={`flex gap-4 justify-between items-center`}>
            <NotificationMenu />
            <MessagesMenu />

            <UserMenu />
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
                className={` ${isActive ? activeStyle : "text-[#F2F2F7]"} flex items-center rounded-[40px] lg:rounded-e-none py-3 px-4 gap-6  text-lg font-medium hover:bg-[#F3F4FF] hover:text-text-body transition-colors`}
                href={item.url}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
      {isOpen && (
        <div className={`container mx-auto p-3 lg:hidden  `}>
          <SearchInput />
        </div>
      )}
    </aside>
  );
}
