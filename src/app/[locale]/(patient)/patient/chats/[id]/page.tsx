"use client";
import Image from "next/image";
import React from "react";
import chatBg from "@/assets/images/chatBGpng.png";
import vector from "@/assets/images/Vector.png";
import doctor from "@/assets/images/Dr. Ahmed.png";
import { FaArrowLeftLong } from "react-icons/fa6";
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
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Input } from "@/components/ui/input";
import { IoMdMicrophone, IoMdSend } from "react-icons/io";
import { FaArrowLeft, FaMicrophone } from "react-icons/fa";
import Rating from "@/app/_components/Rateing";
import PageHeader from "@/app/_components/PageHeader";
import { useTranslations } from "next-intl"; // نداء الـ Hook
import { useParams } from "next/navigation";
import FinishCaseButton from "../FinishCaseButton";

export default function ChatPage() {
  const t = useTranslations("chat");
  const params  = useParams() 
  const {id:requestId} = params 
  console.log('requestId : ' , requestId);

  

  return (
    <section className="bg-[#F3F4FF] flex-1">
      <div className="container p-4 mx-auto space-y-4">
        <PageHeader title={t("pageTitle")} desc={t("pageDesc")} />
      </div>

      <div className="container mx-auto">
        <div className="min-h-screen relative overflow-hidden bg-white flex flex-col justify-center ">
          <Image
            fill
            className="object-cover z-1 absolute h-full"
            src={chatBg}
            alt="bg"
          ></Image>
          <Image
            className="absolute z-2 rtl:-left-70 md:rtl:-left-50 lg:rtl:-left-0  -right-70 md:-right-50 lg:right-0 h-full"
            src={vector}
            alt="vector"
          ></Image>

          <div className="grid grid-cols-12 gap-6 z-3 relative px-4 ">
            <div className=" col-span-6 hidden md:flex min-h-screen items-center justify-center">
              <div>
                <h3 className="font-heading text-black font-bold text-[56px]">
                  {t("heroTitle")}
                </h3>
                <p className="text-text-body font-medium text-[33px]">
                  {t("heroDesc")}
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 flex items-center justify-center">
              <div className="shadow-[0px_38px_95px_0px_#00000040] relative w-95 h-115 bg-[#E0E0E0] rounded-2xl overflow-hidden px-2 py-4 mx-auto">
                <Image
                  src={chatBg}
                  alt="bg"
                  fill
                  className="absolute h-full object-cover z-1"
                ></Image>
                <div className="flex flex-col h-full gap-2">
                  <div className="bg-[#1F2A44] rounded-[35px] relative z-2 flex items-center justify-between p-2">
                    <div className="flex gap-2 items-center">
                      <FaArrowLeft color="white" />
                      <div className="flex gap-2 items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 text-lg text-gray-500 flex items-center justify-center ring-1 ring-white ring-offset-1">
                          <Image src={doctor} alt="doctor"></Image>
                        </div>
                        <div>
                          <p className="font-semibold text-white">Essam</p>
                          <p className="font-light text-xs text-white">
                            {t("statusOnline")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      
                      <FinishCaseButton requestId={requestId as string}/>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="border-none ring-0 outline-none focus-visible:border-0 focus-visible:outline-0 focus-visible:ring-0"
                            variant="outline"
                          >
                            <PiDotsThreeOutlineVerticalFill color="white" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white ring-0"
                        >
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="hover:bg-gray-200">
                              {t("menuBlock")}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-200">
                              {t("menuDelete")}
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="w-full grow spacy-3 p-1 overflow-y-auto relative z-2 ">
                    <div className="bg-[#D2EFFF] rounded-[5px] p-1 text-[10px] w-fit mx-auto">
                      {t("today")}
                    </div>
                    {/* الرسائل تترك كما هي لأن محتواها من المستخدم */}
                    <div className="relative z-2 ms-auto w-fit ">
                      <div className="rounded-[10px] bg-[#E4F5D4] shadow-[0px_2px_1px_0px_#00000033] px-4 py-1.5 w-fit">
                        Hello
                      </div>
                      <span className="text-xs text-text-muted">10:30 am</span>
                    </div>
                    <div className="relative z-2 w-fit ">
                      <div className="rounded-[10px] bg-white shadow-[0px_2px_1px_0px_#00000033] px-4 py-1.5 w-fit">
                        Hello, how can i help you ?
                      </div>
                      <span className="text-xs text-text-muted">10:30 am</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 relative z-2">
                    <div className="relative flex-1">
                      <Input
                        className="bg-white rounded-3xl py-3 ps-4 pe-12 focus-visible:ring-0 focus-visible:border-0 h-auto"
                        placeholder={t("inputPlaceholder")}
                      ></Input>
                      <Button className="absolute top-1/2 -translate-y-1/2 right-2 h-auto text-primary text-lg p-2 rounded-full bg-primary-subtle flex items-center justify-center hover:bg-gray-300">
                        <IoMdSend />
                      </Button>
                    </div>
                    <Button className="w-12 h-12 text-white text-lg p-2 rounded-full bg-primary flex items-center justify-center hover:bg-primary-hover">
                      <FaMicrophone />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
