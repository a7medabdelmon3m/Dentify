import { Button } from "@/components/ui/button";
import { Phone, Mail, ChevronRight, Bell, Search } from "lucide-react";
import Image from "next/image";
import me from "@/assets/images/patient.jpg";
import { getTranslations } from "next-intl/server";
import { FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import PageHeader from "@/app/_components/PageHeader";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Doctor {
  id: number;
  initials: string;
  name: string;
  specialty: string;
}

interface ChatMessage {
  id: number;
  initials: string;
  name: string;
  preview: string;
  time: string;
  unread?: boolean;
}

interface CaseStat {
  label: string;
  value: number;
  colorClass: string;
  textColorClass: string;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Avatar({
  initials,
  size = "md",
  dark = false,
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}) {
  const sizeClass = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
  }[size];

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-semibold shrink-0 ${
        dark ? "bg-[#1F2A44] text-white" : "bg-primary-subtle text-[#1F2A44]"
      }`}
    >
      {initials}
    </div>
  );
}

function ProgressBar({ stat }: { stat: CaseStat }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-body/70 font-medium">
          {stat.label}
        </span>
        <span className={`text-sm font-semibold ${stat.textColorClass}`}>
          {stat.value}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-primary-subtle overflow-hidden">
        <div
          className={`h-full rounded-full ${stat.colorClass} transition-all duration-700`}
          style={{ width: `${stat.value}%` }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default async function DentoryDashboard() {
  const t = await getTranslations("PatientDashboard");
  const s = await getTranslations("PatientProfile");

  // ─── Data ────────────────────────────────────────────────────────────────────

  const doctors: Doctor[] = [
    { id: 1, initials: "AH", name: "Ahmed", specialty: t("dentist") },
    { id: 2, initials: "BE", name: "Belal", specialty: t("dentist") },
    { id: 3, initials: "AL", name: "Ali", specialty: t("dentist") },
  ];

  const chats: ChatMessage[] = [
    {
      id: 1,
      initials: "AH",
      name: "Ahmed",
      preview: t("appointmentConfirmed"),
      time: "10:30",
      unread: true,
    },
    {
      id: 2,
      initials: "BE",
      name: "Belal",
      preview: t("bringXray"),
      time: t("yesterday"),
    },
    {
      id: 3,
      initials: "SU",
      name: t("support"),
      preview: t("caseUpdated"),
      time: t("monday"),
    },
    {
      id: 4,
      initials: "AL",
      name: "Ali",
      preview: t("reviewPrescription"),
      time: t("sunday"),
    },
  ];

  const caseStats: CaseStat[] = [
    {
      label: t("matchedCases"),
      value: 62,
      colorClass: "bg-green-500",
      textColorClass: "text-green-600",
    },
    {
      label: t("expiredCases"),
      value: 50,
      colorClass: "bg-amber-400",
      textColorClass: "text-amber-500",
    },
    {
      label: t("publishedCases"),
      value: 70,
      colorClass: "bg-blue-500",
      textColorClass: "text-blue-600",
    },
    {
      label: t("rejectedCases"),
      value: 32,
      colorClass: "bg-red-500",
      textColorClass: "text-red-600",
    },
  ];

  return (
    <div className="container p-4 mx-auto space-y-4">
      <PageHeader title={t(`title`)} desc={t(`description`)}/>
     

      <div className="border-2 border-white bg-white rounded-[20px] overflow-hidden shadow-sm mb-10">
        <div className="bg-linear-to-r from-primary to-primary-hover min-h-35 md:min-h-40 overflow-hidden relative">
          <div className="absolute w-64 h-64 rounded-full bg-[#2E52B2]/50 right-1/2 translate-x-1/2  top-8 md:right-10 md:translate-0 shrink-0 "></div>
        </div>

        <div className="relative px-6 pb-8 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="relative col-span-1 -mt-16 md:-mt-20 flex flex-col items-center md:items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border-4 md:border-8 border-white shadow-md">
                <Image fill className="object-cover" src={me} alt="user" />
              </div>
              <div className="mt-4 flex flex-col items-center md:items-start">
                <h3 className="text-text-title text-2xl md:text-3xl font-bold font-heading text-center md:text-left">
                  Essam Azzam
                </h3>
                <span className="inline-block w-fit px-3 py-1 mt-1 text-sm font-semibold text-primary bg-primary/10 rounded-md border border-primary/20">
                  {s("userRole")}
                </span>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col sm:flex-row gap-6 lg:gap-12 mt-6 lg:mt-8 ">
              <div className="lg:mt-8 space-y-3 flex-1 flex flex-col items-center sm:items-start">
                <p className="text-sm md:text-base text-text-muted font-medium uppercase tracking-wider text-center sm:text-left">
                  {s("phoneLabel")}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-4 w-full">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#0DF22F] rounded-full text-white shadow-lg shadow-[#0DF22F]/20">
                    <FaPhone size={18} />
                  </div>
                  <span className="text-base md:text-lg text-text-body font-bold">
                    +12 345 6789 0
                  </span>
                </div>
              </div>

              <div className="lg:mt-8 space-y-3 flex-1 flex flex-col items-center sm:items-start">
                <p className="text-sm md:text-base text-text-muted font-medium uppercase tracking-wider text-center sm:text-left">
                  {s("emailLabel")}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-4 w-full">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#0DF22F] rounded-full text-white shadow-lg shadow-[#0DF22F]/20">
                    <MdOutlineEmail size={20} />
                  </div>
                  <span className="text-base md:text-lg text-text-body font-bold">
                    jordan@mail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-[#1F2A44]">
          {t("casesDetails")}
        </h2>
        <a href="#" className="text-xs text-blue-600 hover:underline">
          {t("viewAllCases")}
        </a>
      </div>

      <div className="bg-white rounded-xl border border-[#D8DCE8] p-4 sm:p-6 mb-6">
        <div className="flex items-start justify-between pb-4 mb-4 border-b border-primary-subtle">
          <div>
            <p className="text-xs text-text-body/60 font-medium mb-1">
              {t("casesThisMonth")}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#1F2A44]">3</span>
              <span className="text-sm text-text-body/40">/ 5</span>
              <span className="px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                {t("onTrack")}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-body/40 mb-0.5">
              {t("completion")}
            </p>
            <p className="text-2xl font-bold text-green-600">60%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {caseStats.map((stat) => (
            <ProgressBar key={stat.label} stat={stat} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-[#D8DCE8] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#1F2A44]">
              {t("relatedDoctors")}
            </h2>
            <a href="#" className="text-xs text-blue-600 hover:underline">
              {t("seeAll")}
            </a>
          </div>
          <ul className="space-y-2">
            {doctors.map((doc) => (
              <li key={doc.id}>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#D8DCE8] hover:bg-primary-subtle transition-colors text-left">
                  <Avatar initials={doc.initials} dark />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1F2A44]">
                      {doc.name}
                    </p>
                    <p className="text-xs text-text-body/55">
                      {doc.specialty}
                    </p>
                  </div>
                  <ChevronRight size={15} className="text-[#D8DCE8] shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-[#D8DCE8] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#1F2A44]">
              {t("recentChats")}
            </h2>
            <a href="#" className="text-xs text-blue-600 hover:underline">
              {t("viewAll")}
            </a>
          </div>
          <ul className="space-y-1">
            {chats.map((chat) => (
              <li key={chat.id}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                    chat.unread
                      ? "bg-blue-50/60 border border-blue-100 hover:bg-blue-50"
                      : "hover:bg-primary-subtle border border-transparent"
                  }`}
                >
                  <Avatar initials={chat.initials} dark />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1F2A44]">
                      {chat.name}
                    </p>
                    <p className="text-xs text-text-body/55 truncate">
                      {chat.preview}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-xs text-text-body/35">
                      {chat.time}
                    </span>
                    {chat.unread && (
                      <span className="w-2 h-2 rounded-full bg-[#1F2A44]" />
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}