"use client";
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import user from "@/assets/images/patient.jpg";
import { ImProfile } from "react-icons/im";
import { FaRegEnvelope } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslations } from "next-intl";

export function NotificationMenu() {
  const isMobile = useIsMobile();
  const t = useTranslations("NotificationMenu"); // استخدام اسم الكومبوننت

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          title={t("title")}
          className="relative flex justify-center items-center text-white hover:bg-primary-subtle hover:text-primary transition-colors shadow-md shadow-[#BF156C0D] w-10 h-10 rounded-full text-2xl"
        >
          <IoNotificationsOutline />
          <div className="w-2 h-2 rounded-full bg-red-700 absolute top-1 right-1"></div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={isMobile ? `center` : `end`}
        className="bg-white ring-0 bottom-4 w-70 h-80 space-y-2 scroll-auto"
      >
        <DropdownMenuLabel className="text-sm py-1 font-semibold flex gap-2 items-center bg-gray-200 border-b border-gray-300">
          <IoNotificationsOutline />
          {t("label")}
        </DropdownMenuLabel>

        {Array.from({ length: 10 }).map((_, idx) => (
          <DropdownMenuItem
            key={idx}
            asChild
            className="hover:bg-gray-100 bg-gray-50 shadow-sm cursor-pointer"
          >
            <Link className="flex gap-3 items-center" href={`/`}>
              <div className="w-12 h-12 relative shrink-0">
                <div className="w-12 h-12 rounded-full flex justify-center items-center relative overflow-hidden bg-gray-200 text-gray-500 text-2xl">
                  <GoBell />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500 line-clamp-3">
                  {t("defaultMessage")}
                </p>
                <p className="text-xs text-gray-400 font-thin">{t("timeAgo")}</p>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}