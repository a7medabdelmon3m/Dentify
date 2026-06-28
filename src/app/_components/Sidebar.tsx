"use client";

import { useParams, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react"; // ضفنا useEffect هنا
import { motion, AnimatePresence } from "framer-motion";
import { BsClipboardPlusFill } from "react-icons/bs";
import {
  FaBars,
  FaBriefcaseMedical,
  FaCalendarCheck,
  FaHandHoldingHeart,
  FaPaperPlane,
  FaRegEnvelope,
  FaUsers,
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
import { useTranslations } from "next-intl";

export type prop = {
  userType: "patient" | "student" | string;
};

export default function Sidebar({ userType }: prop) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // ضفنا State للشاشات الكبيرة

  const pathName = usePathname();
  const { locale } = useParams();

  const t = useTranslations("Sidebar");
  const isPatient = userType === "patient";

  const patientItems = [
    {
      title: t("Patient.dashboard"),
      url: `/patient/dashboard`,
      icon: <MdDashboard />,
    },
    {
      title: t("Patient.createCase"),
      url: `/patient/create-case`,
      icon: <IoIosCreate />,
    },
    {
      title: t("Patient.availableDoctors"),
      url: `/patient/available-doctors`,
      icon: <FaUserDoctor />,
    },
    {
      title: t("Patient.careProposals"),
      url: `/patient/proposals`,
      icon: <FaHandHoldingHeart />,
    },
    {
      title: t("Patient.appointments"),
      url: `/patient/appointment`,
      icon: <FaCalendarCheck />,
    },
  ];

  const studentItems = [
    {
      title: t("Student.dashboard"),
      url: `/student/dashboard`,
      icon: <MdDashboard />,
    },
    {
      title: t("Student.availableCases"),
      url: `/student/available-cases`,
      icon: <FaBriefcaseMedical />,
    },
    {
      title: t("Student.myProposals"),
      url: "/student/my-proposals",
      icon: <FaPaperPlane className="w-5 h-5" />,
    },
    {
      title: t("Student.myPatients"),
      url: `/student/my-patients`,
      icon: <FaUsers />,
    },
    {
      title: t("Student.settings"),
      url: `/student/settings`,
      icon: <GoGear />,
    },
  ];

  const menuItems = isPatient ? patientItems : studentItems;

  // ── التعديل هنا: مراقبة حجم الشاشة عشان نعالج مشكلة الاختفاء ──
  useEffect(() => {
    const handleResize = () => {
      // لو الشاشة أكبر من 1024 بيكسل، خليها Desktop
      if (window.innerWidth >= 1024) {
        setIsDesktop(true);
        setIsOpen(false); // نقفل المنيو بتاعة الموبايل عشان متبقاش معلقة
      } else {
        setIsDesktop(false);
      }
    };

    // تشغيلها أول مرة لما الصفحة تفتح
    handleResize();

    // نراقب أي تغيير في حجم الشاشة
    window.addEventListener("resize", handleResize);

    // تنظيف المراقبة لما نقفل الصفحة
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className="fixed top-0 lg:bottom-0 lg:h-screen z-50 w-full lg:w-72 bg-primary shadow-2xl lg:shadow-none transition-all duration-300 overflow-x-hidden overflow-y-auto">
      {/* ── الهيدر (اللوجو وأيقونات الموبايل) ── */}
      <div className="flex justify-between items-center h-20 px-6 border-b border-white/10 lg:border-none">
        <h1 className="text-white text-3xl font-extrabold font-heading tracking-wide">
          Dentify<span className="text-[#FACC15]">.</span>
        </h1>

        {/* أيقونات الموبايل */}
        <div className="flex items-center gap-4 lg:hidden">
          <div className="flex gap-3 items-center">
            <NotificationMenu />
            <MessagesMenu />
            <UserMenu />
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white text-2xl bg-white/10 hover:bg-white/20 rounded-xl transition-colors focus:outline-none"
          >
            {isOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ── القائمة (روابط السايدبار) ── */}
      <AnimatePresence>
        {/* استخدمنا State الـ isDesktop هنا عشان تظهر أوتوماتيك */}
        {(isOpen || isDesktop) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:!h-auto lg:!opacity-100"
          >
            <div className="px-4 lg:px-0 lg:ps-6 py-6 space-y-2 lg:mt-6 overflow-hidden">
              {menuItems.map((item, idx) => {
                const isActive = pathName.includes(item.url);

                return (
                  <Link
                    key={idx}
                    href={item.url}
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={`flex items-center gap-4 py-3.5 px-5 text-base font-bold transition-all duration-300 cursor-pointer 
                        ${
                          isActive
                            ? "bg-[#F3F4FF] text-primary rounded-3xl lg:rounded-e-none lg:rounded-s-3xl relative"
                            : "text-white/80 hover:bg-white/10 hover:text-white rounded-3xl lg:rounded-e-none lg:rounded-s-3xl"
                        }
                      `}
                    >
                      {/* آيكون العنصر */}
                      <span
                        className={`text-xl ${isActive ? "text-primary" : "text-white/70"}`}
                      >
                        {item.icon}
                      </span>
                      {item.title}

                      {/* ── تأثير الشادو المفضل ليك ── */}
                      {isActive && (
                        <>
                          <div className="hidden lg:block absolute -top-10 end-0 w-10 h-10 bg-transparent rounded-br-3xl shadow-[10px_10px_0_10px_#F3F4FF] rtl:rounded-br-none rtl:rounded-bl-3xl rtl:shadow-[-10px_10px_0_10px_#F3F4FF]"></div>
                          <div className="hidden lg:block absolute -bottom-10 end-0 w-10 h-10 bg-transparent rounded-tr-3xl shadow-[10px_-10px_0_10px_#F3F4FF] rtl:rounded-tr-none rtl:rounded-tl-3xl rtl:shadow-[-10px_-10px_0_10px_#F3F4FF]"></div>
                        </>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* شريط البحث في الموبايل */}
            <div className="container mx-auto px-4 pb-6 lg:hidden">
              <SearchInput />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
