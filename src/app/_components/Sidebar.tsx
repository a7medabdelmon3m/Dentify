"use client";

import { useParams, usePathname } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaBriefcaseMedical,
  FaHandHoldingHeart,
  FaPaperPlane,
  FaUsers,
} from "react-icons/fa";
import { FaUserDoctor, FaUserGear, FaXmark } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { NotificationMenu } from "@/app/_components/menus/NotificationsMenu";
import { MessagesMenu } from "@/app/_components/menus/messagesMenu";
import { UserMenu } from "@/app/_components/menus/UserMenu";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { CalendarClock, MessageSquare } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/images/white-logo.png";
import { notificationType } from "@/type";

export type prop = {
  userType: "patient" | "student" | string;
  token: string;
};

export default function Sidebar({ userType, token }: prop) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const [notifications, setNotifications] = useState<notificationType[]>([]);

  const pathName = usePathname();
  const { locale } = useParams();

  const t = useTranslations("Sidebar");
  const isPatient = userType === "patient";

  const menuItems = useMemo(() => {
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
        title: t("Patient.chat"),
        icon: <MessageSquare className="w-5 h-5" />,
        url: "/patient/chat",
      },
      {
        title: t("Patient.profileAndSettings"),
        url: "/patient/profile",
        icon: <FaUserGear className="w-5 h-5" />,
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
        title: t("Student.profileAndSettings"),
        url: "/student/profile",
        icon: <FaUserGear className="w-5 h-5" />,
      },
    ];

    return isPatient ? patientItems : studentItems;
  }, [isPatient, t]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return; 

      try {
        const res = await fetch("http://localhost:5123/api/Notification", {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        } else {
          console.error("Failed to fetch notifications, status:", res.status);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [token]);

  const msgNotifications = notifications.filter((n) => n.type === 1);
  const generalNotifications = notifications.filter((n) => n.type !== 1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsDesktop(true);
        setIsOpen(false);
      } else {
        setIsDesktop(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className="fixed top-0 lg:bottom-0 lg:h-screen z-50 w-full lg:w-72 bg-primary shadow-2xl lg:shadow-none transition-all duration-300  ">
      <div className="flex justify-between items-center h-20 px-6 border-b border-white/10 lg:border-none">
        <Link
          href="/"
          className="relative w-24 h-24 sm:w-26 sm:h-26 md:w-28 md:h-28"
        >
          <Image
            fill
            src={logo}
            alt="Dentify Logo"
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-4 lg:hidden">
          <div className="flex gap-3 items-center">
            <NotificationMenu items={generalNotifications} />
            <MessagesMenu items={msgNotifications} />
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

      <AnimatePresence>
        {(isOpen || isDesktop) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:h-auto! lg:opacity-100!"
          >
            <div className="px-4 lg:px-0 lg:ps-6 py-6 space-y-2 lg:mt-6 overflow-hidden max-h-[calc(100vh-5rem)]">
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
                      <span
                        className={`text-xl ${isActive ? "text-primary" : "text-white/70"}`}
                      >
                        {item.icon}
                      </span>
                      {item.title}
                      {isActive && (
                        <>
                          <div className="hidden lg:block absolute -top-10 inset-e-0 w-10 h-10 bg-transparent rounded-br-3xl shadow-[10px_10px_0_10px_#F3F4FF] rtl:rounded-br-none rtl:rounded-bl-3xl rtl:shadow-[-10px_10px_0_10px_#F3F4FF]"></div>
                          <div className="hidden lg:block absolute -bottom-10 inset-e-0 w-10 h-10 bg-transparent rounded-tr-3xl shadow-[10px_-10px_0_10px_#F3F4FF] rtl:rounded-tr-none rtl:rounded-tl-3xl rtl:shadow-[-10px_-10px_0_10px_#F3F4FF]"></div>
                        </>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
