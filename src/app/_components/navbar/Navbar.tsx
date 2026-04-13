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
import { useTranslations } from "next-intl";
import LanguageChanger from "../ChangeLangBtn";

export function NavigationMenuDemo() {
  //  const {locale} =  params;
  // console.log('locale from navbar : ' , locale);
  
  const [navIsDroped, setnavIsDroped] = React.useState(false);
     const t = useTranslations('hero');
  
  return (
    <div className="container mx-auto px-4 mt-8 ">
      <NavigationMenu className=" min-w-full block">
        <NavigationMenuList className="flex flex-col lg:flex-row rtl:flex-row-reverse justify-between items-center py-8 gap-8 lg:gap-0 ">
          <div className="w-full flex justify-between items-center rtl:flex-row-reverse">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  className="font-semibold! text-5xl! text-text-title! font-heading"
                  href="/"
                >
                  {t(`brand_name`)}
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
                      rtl:flex-row-reverse
                    `}
          >
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  className="py-2.5 px-6 opacity-75! whitespace-nowrap rounded-full! text-[20px] font-normal! border border-border-main hover:bg-primary-hover hover:text-white transition-all duration-300 w-full!"
                  href="/"
                >
                  {t(`nav.home`)}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  className="py-2.5 px-6 whitespace-nowrap opacity-75 rounded-full! text-[20px] font-normal! border border-border-main hover:bg-primary-hover hover:text-white transition-all duration-300 w-full!"
                  href="/about"
                >
                  {t(`nav.about`)}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a
                  className="py-2.5 px-6 opacity-75 whitespace-nowrap rounded-full! text-[20px] font-normal! border border-border-main hover:bg-primary-hover hover:text-white transition-all duration-300 w-full!"
                  href="#contact"
                >
                  {t(`nav.contact`)}
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
             <NavigationMenuItem>
              <LanguageChanger/>
            </NavigationMenuItem>
            {/* LanguageChanger */}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
