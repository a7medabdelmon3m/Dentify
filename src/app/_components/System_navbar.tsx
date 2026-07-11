"use client";
import React, { useEffect, useState } from "react";
import { GoGear } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { UserMenu } from "./menus/UserMenu";
import { FaRegEnvelope } from "react-icons/fa";
import { MessagesMenu } from "./menus/messagesMenu";
import { NotificationMenu } from "./menus/NotificationsMenu";
import { notificationType } from "@/type";

export default function System_navbar({ token }: { token: string }) {
  const [notifications, setNotifications] = useState<notificationType[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return; 

      try {
        const res = await fetch("http://localhost:5123/api/Notification", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
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

  // console.log('notifications : ' , notifications);
  
  const msgNotifications = notifications.filter((n) => n.type === 1);
  const generalNotifications = notifications.filter((n) => n.type !== 1);

  return (
    <nav className="bg-primary sticky top-0 right-0 left-0 z-7 hidden lg:block ">
      <div className="container p-4 mx-auto ">
        <div className="flex justify-end">
          <div className={`flex gap-4 justify-between items-center`}>
            <NotificationMenu items={generalNotifications} />
            <MessagesMenu items={msgNotifications} />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}