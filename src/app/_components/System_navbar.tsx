import React from "react";
import { GoGear } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { UserMenu } from "./menus/UserMenu";
import { FaRegEnvelope } from "react-icons/fa";
import { MessagesMenu } from "./menus/messagesMenu";
import { NotificationMenu } from "./menus/NotificationsMenu";

export default function System_navbar() {
  return (
    <nav className="bg-primary sticky top-0 right-0 left-0 z-7 hidden lg:block ">
      <div className="container p-4 mx-auto ">
        <div className="flex justify-between">
          <SearchInput />
          <div className={`flex gap-4 justify-between items-center`}>
            
            <NotificationMenu/>
            <MessagesMenu/>
            
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
