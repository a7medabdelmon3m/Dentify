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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import user from "@/assets/images/patient.jpg";
import { ImProfile } from "react-icons/im";
import { useTranslations } from "next-intl";
import { logoutAction } from "@/app/api/authActions/login.action";
// const UserItems = [
//     {label:'profile' , icon:<ImProfile /> ,isLink:true ,url:`/patient/profile`},
//     {label:'sign out' , icon: <LogOutIcon /> ,isLink:false ,url:``},
// ]
function handleLogOut(){

}

export function UserMenu() {
  const t = useTranslations(`UserMenu`) ;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <div
            title="Ahmed Abdelmoneim"
            
            className="flex gap-2 items-center"
          >
            <div className="relative w-10 h-10 flex justify-center flex-center rounded-full overflow-hidden bg-bg-card ring-2 ring-offset-2">
              <Image
                fill
                sizes="48px"
                className="object-cover"
                src={user}
                alt="user"
              ></Image>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="bg-white ring-0 bottom-4 min-w-fit ">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="hover:bg-gray-100  cursor-pointer"  >
            <Link href={`/patient/profile`}>
            <ImProfile />
            {t(`profile`)}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logoutAction} className="hover:bg-red-100 cursor-pointer text-red-500">
         <LogOutIcon  />
          {t(`signOut`)}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
