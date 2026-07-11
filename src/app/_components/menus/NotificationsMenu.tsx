"use client";
import { useState, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslations } from "next-intl";
import { notificationType } from "@/type";

export function NotificationMenu({ items = [], token }: { items: notificationType[], token?: string }) {
  const isMobile = useIsMobile();
  const t = useTranslations("NotificationMenu");

  const [localItems, setLocalItems] = useState<notificationType[]>(items);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  useEffect(() => {
    if (!token) return;
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch("http://localhost:5123/api/Notification/unread-count", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const count = typeof data === 'number' ? data : data?.count || 0;
          setUnreadCount(count);
        }
      } catch (error) {
        console.error("Error fetching unread count", error);
      }
    };
    fetchUnreadCount();
  }, [token]);

  const getNotificationLink = (type: number, referenceId: number) => {
    switch (type) {
      case 2:
      case 3:
      case 4:
        return `/requests/${referenceId}`;
      case 5:
      case 6:
        return `/appointments/${referenceId}`;
      default:
        return `/`;
    }
  };

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
          <IoNotificationsOutline />
          {unreadCount > 0 && (
            <div className="absolute top-0 -right-1 min-w-[18px] h-[18px] bg-red-600 rounded-full flex justify-center items-center text-[10px] text-white font-bold px-1 border border-primary">
              {unreadCount > 99 ? "+99" : unreadCount}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={isMobile ? `center` : `end`}
        className="bg-white ring-0 bottom-4 w-70 max-h-80 overflow-y-auto space-y-2"
      >
        <DropdownMenuLabel className="text-sm py-1 font-semibold flex gap-2 items-center bg-gray-200 border-b border-gray-300 sticky top-0 z-10">
          <IoNotificationsOutline />
          {t("label")}
        </DropdownMenuLabel>

        {localItems.length > 0 ? (
          localItems.map((notif) => (
            <DropdownMenuItem
              key={notif.id}
              asChild
              className={`hover:bg-gray-100 shadow-sm cursor-pointer ${
                !notif.isRead ? "bg-blue-50/50" : "bg-gray-50"
              }`}
            >
              <Link
                className="flex gap-3 items-center p-2"
                href={getNotificationLink(notif.type, notif.referenceId)}
              >
                <div className="w-12 h-12 relative shrink-0">
                  <div className="w-12 h-12 rounded-full flex justify-center items-center relative overflow-hidden bg-gray-200 text-gray-500 text-2xl">
                    <GoBell />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700 line-clamp-1">
                    {notif.title}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                    {notif.message}
                  </p>
                  <p className="text-[10px] text-gray-400 font-thin mt-1">
                    {new Date(notif.createdAt).toLocaleDateString()}
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