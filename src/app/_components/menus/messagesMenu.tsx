"use client";
import { useState, useEffect } from "react";
import { FaEnvelope, FaRegEnvelope } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import userImg from "@/assets/images/patient.jpg"; 
import { useTranslations } from "next-intl";
import { notificationType } from "@/type";

export function MessagesMenu({ items = [], token }: { items: notificationType[], token?: string }) {
  const t = useTranslations("MessagesMenu");

  const [localItems, setLocalItems] = useState<notificationType[]>(items);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  useEffect(() => {
    setUnreadCount(items.filter(n => !n.isRead).length);
  }, [items]);

  const handleOpenChange = async (open: boolean) => {
    if (open && unreadCount > 0) {
      setUnreadCount(0);
      setLocalItems(prev => prev.map(n => ({ ...n, isRead: true })));

      if (token) {
        try {
          await fetch("http://localhost:5123/api/Notification/read-all", {
            method: "POST", 
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
        } catch (error) {
          console.error("Error marking all as read", error);
        }
      }
    }
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <div
          title={t("title")}
          className="relative flex justify-center items-center text-white hover:bg-primary-subtle hover:text-primary transition-colors shadow-md shadow-[#BF156C0D] w-10 h-10 rounded-full text-2xl cursor-pointer"
        >
          <FaRegEnvelope />
          {unreadCount > 0 && (
            <div className="absolute top-0 -right-1 min-w-[18px] h-[18px] bg-red-600 rounded-full flex justify-center items-center text-[10px] text-white font-bold px-1 border border-primary">
              {unreadCount > 99 ? "+99" : unreadCount}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-white ring-0 bottom-4 w-70 max-h-80 overflow-y-auto space-y-2"
      >
        <DropdownMenuLabel className="text-sm py-1 font-semibold flex gap-2 items-center bg-gray-200 border-b border-gray-300 sticky top-0 z-10">
          <FaEnvelope />
          {t("label")}
        </DropdownMenuLabel>

        {localItems.length > 0 ? (
          localItems.map((msg) => (
            <DropdownMenuItem
              key={msg.id}
              asChild
              className={`hover:bg-gray-100 shadow-sm cursor-pointer ${
                !msg.isRead ? "bg-blue-50/50" : "bg-gray-50"
              }`}
            >
              <Link
                className="flex gap-3 items-center p-2"
                href={`/patient/chats/${msg.referenceId}`}
              >
                <div className="w-12 h-12 relative shrink-0">
                  <div className="w-12 h-12 rounded-full flex justify-center items-center relative overflow-hidden bg-gray-200 text-gray-500 text-xl">
                    <Image
                      fill
                      className="object-cover"
                      src={userImg}
                      alt="message"
                    />
                  </div>
                  {!msg.isRead && (
                    <div className="w-3 h-3 bg-success rounded-full absolute bottom-0 ring-1 ring-white ring-offset-1 right-0"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h6 className="text-sm font-heading text-text-title font-bold line-clamp-1">
                    {msg.title}
                  </h6>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                    {msg.message}
                  </p>
                  <p className="text-[10px] text-gray-400 font-thin mt-1">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            {t("empty")}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}