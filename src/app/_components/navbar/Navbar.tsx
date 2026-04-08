"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa";

export function NavigationMenuDemo() {
  const [navIsDroped, setnavIsDroped] = React.useState(false);
  return (
    <div className="container mx-auto px-4 mt-8 ">
      <NavigationMenu className=" min-w-full block">
        <NavigationMenuList className="flex flex-col lg:flex-row justify-between items-center py-8 gap-8 lg:gap-0 ">
          <div className=" w-full flex justify-between ">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  className="font-semibold! text-5xl! text-text-title! font-heading"
                  href="/"
                >
                  Dentify
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <Button
              onClick={() => setnavIsDroped(!navIsDroped)}
              className="bg-primary  h-auto p-2 text-white! lg:hidden"
            >
              <FaBars />
            </Button>
          </div>

          <div
            className={`
                      ${navIsDroped ? 'flex' : 'hidden'} 
                      lg:flex 
                      flex-col lg:flex-row 
                      gap-4 lg:gap-9 
                      p-4 lg:px-2 
                      bg-[#1F2A44]/70 lg:bg-transparent 
                      w-full lg:w-auto
                    `}
          >
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  className="py-2.5 px-6 opacity-75! rounded-full! text-[20px] font-normal! border border-border-main hover:bg-primary-hover hover:text-white transition-all duration-300 w-full!"
                  href="/"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  className="py-2.5 px-6 opacity-75 rounded-full! text-[20px] font-normal! border border-border-main hover:bg-primary-hover hover:text-white transition-all duration-300 w-full!"
                  href="/about"
                >
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  className="py-2.5 px-6 opacity-75 rounded-full! text-[20px] font-normal! border border-border-main hover:bg-primary-hover hover:text-white transition-all duration-300 w-full!"
                  href="/"
                >
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  className="py-2.5 px-6 opacity-75 rounded-full! text-[20px] font-normal! border border-border-main hover:bg-primary-hover hover:text-white transition-all duration-300 w-full!"
                  href="/"
                >
                  Login
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
