"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BsUpload } from "react-icons/bs";
import { GoMute } from "react-icons/go";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import user from "@/assets/images/patient.jpg";
import model from "@/assets/images/AI_model.png";
import { FaMicrophone } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { FiSend } from "react-icons/fi";
import { usePatientCont } from "../contexts/patientContext";
import { useTranslations } from "next-intl";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatBotBtn from "./ChatBotBtn";

export function ChatBot() {
  const { chatIsOpen, setchatIsOpen } = usePatientCont();
  const t = useTranslations("chatBot");

  return (
    <Popover open={chatIsOpen} onOpenChange={setchatIsOpen}>
      <PopoverTrigger className="border-none! h-auto! focus-visible:outline-0 focus:ring-0" asChild>
        <Button variant="outline"><ChatBotBtn /></Button>
      </PopoverTrigger>
      
      <PopoverContent className="bg-white border-0! p-4 shadow-2xl rounded-2xl w-[350px]" align="end">
        <PopoverHeader className="p-0">
          <PopoverTitle className="font-heading font-bold text-2xl text-text-title px-3">
            {t("title")}
          </PopoverTitle>
          
          <PopoverDescription className="text-start">
            {/* استبدلنا الـ div بـ span block لحل مشكلة الـ Nesting والـ TypeScript */}
            <span className="block space-y-2 ps-3 mb-8 mt-2">
              <span className="block text-sm font-bold text-text-body">
                {t("description")}
              </span>
              <span className="block text-xs text-text-muted">2 March 2021, 13:45 PM</span>
            </span>

            <span className="block -mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
              <span className="block space-y-6">
                <span className="block border-s border-dashed border-gray-300 px-2">
                  <span className="flex justify-between gap-2.5 items-center text-[#A8B2FF] text-lg mb-6">
                    <TfiArrowCircleLeft className="hover:text-text-body cursor-pointer transition-colors rtl:rotate-180" />
                    <span className="text-text-title/70 font-bold text-xl">
                      {t("aiChatHeader")}
                    </span>
                    <span className="flex gap-2 items-center">
                      <BsUpload className="hover:text-text-body cursor-pointer transition-colors" />
                      <GoMute className="hover:text-text-body cursor-pointer transition-colors" />
                    </span>
                  </span>
                  
                  <span className="block text-xs text-text-muted font-semibold text-center mb-8">
                    {t("today")}, 04:12 pm
                  </span>

                  <span className="block space-y-6 mb-6">
                    {/* رسالة الـ AI */}
                    <span className="flex gap-3 text-start">
                      <span className="w-8 h-8 relative shrink-0">
                        <Image
                          fill
                          sizes="32px"
                          className="object-contain"
                          src={model}
                          alt="Ai Icon"
                        />
                      </span>
                      <span className="p-2.5 rounded-xl bg-[#D9DDFF] text-text-title text-sm font-semibold">
                        {t("hiThere")}
                      </span>
                    </span>

                    {/* رسالة المستخدم */}
                    <span className="flex gap-3 justify-end text-end">
                      <span className="p-2.5 rounded-xl bg-[#295BFF] text-white text-sm font-semibold">
                        {t("hiThere")}
                      </span>
                      <span className="w-8 h-8 relative flex justify-center items-center rounded-full overflow-hidden shrink-0 border border-gray-100">
                        <Image
                          fill
                          sizes="32px"
                          className="object-cover"
                          src={user}
                          alt="User Icon"
                        />
                      </span>
                    </span>
                  </span>
                </span>

                {/* منطقة الإدخال */}
                <span className="flex gap-2 items-center pb-2">
                  <label htmlFor="voice">
                    <span className="flex gap-2.5 w-8 h-8 shrink-0 rounded-full items-center justify-center bg-[#D9DDFF] text-text-muted hover:bg-primary-hover hover:text-white transition-colors cursor-pointer">
                      <FaMicrophone />
                    </span>
                  </label>
                  <Input id="voice" type="file" className="hidden" />
                  
                  <span className="relative flex-1">
                    <Input
                      className="py-2 ps-3 pe-10 bg-[#D9DDFF] rounded-[30px] border-0 focus-visible:ring-2 focus-visible:ring-primary/40 text-text-title"
                      placeholder={t("placeholder")}
                    />
                    <Button className="bg-transparent p-0 absolute top-1/2 right-3 -translate-y-1/2 hover:bg-transparent h-auto">
                      <FiSend className="text-text-muted hover:text-primary transition-colors" />
                    </Button>
                  </span>
                </span>
              </span>
            </span>
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}