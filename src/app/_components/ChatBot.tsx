"use client";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { BsUpload } from "react-icons/bs";
import { GoMute } from "react-icons/go";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import user from "@/assets/images/patient.jpg";
import model from "@/assets/images/AI_model.png";
import chatBot from "@/assets/images/chat-bot.gif";
import { FaMicrophone } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { FiSend } from "react-icons/fi";
import { usePatientCont } from "../contexts/patientContext";
import { useIsMobile } from "@/hooks/use-mobile";



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

  return (
    <Popover open={chatIsOpen} onOpenChange={setchatIsOpen}>
      <PopoverTrigger className="border-none! h-auto! focus-visible:outline-0 focus:ring-0" asChild>
        <Button variant="outline"><ChatBotBtn/></Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white border-0! p-4 " align="end">
        <PopoverHeader>
          <PopoverTitle className="font-heading font-bold text-2xl text-text-title">
            Chat bot
          </PopoverTitle>
          <PopoverDescription>
            <div className="space-y-2 ps-3 mb-16">
              <span className="text-sm font-bold text-text-body">
                If you find a problem in our site this chat will help you
              </span>

              <span className="text-sm text-text-muted">2 March 2021, 13:45 PM</span>
            </div>
            <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
              <div className="space-y-6">
                <div className="border-s border-dashed border-gray-300 px-2">
                  <div className="flex justify-between gap-2.5 items-center text-[#A8B2FF] text-lg mb-6">
                    <TfiArrowCircleLeft className="hover:text-text-body cursor-pointer transition-colors" />
                    <p className="text-text-title/70 font-bold text-xl">
                      AI Chat
                    </p>
                    <div className="flex gap-2 items-center ">
                      <BsUpload className="hover:text-text-body cursor-pointer transition-colors" />
                      <GoMute className="hover:text-text-body cursor-pointer transition-colors" />
                    </div>
                  </div>
                  <p className="text-xs text-text-muted font-semibold text-center mb-8">
                    Today,04:12 pm
                  </p>
                  <div className="space-y-6 mb-6">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 relative">
                        <Image
                          fill
                          className="object-contain"
                          src={model}
                          alt="Ai"
                        ></Image>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#D9DDFF] flex gap-2 text-sm font-semibold ">
                        Hi,there!
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="p-2.5 rounded-xl bg-[#295BFF] flex gap-2 text-sm font-semibold text-white ">
                        Hi,there!
                      </div>
                      <div className="w-8 h-8 relative flex justify-center items-center rounded-full overflow-hidden ">
                        <Image
                          fill
                          className="object-cover"
                          src={user}
                          alt="Ai"
                        ></Image>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center ">
                  <label htmlFor="voice">
                    <div className="flex gap-2.5 w-8 h-8 shrink-0 rounded-full items-center justify-center bg-[#D9DDFF] text-text-muted hover:bg-primary-hover hover:text-white transition-colors cursor-pointer">
                      <FaMicrophone />
                    </div>
                  </label>

                  <Input id="voice" type="file" className="hidden" />
                  <div className="relative flex-1">
                    <Input
                      className="py-2 ps-3 pe-10 bg-[#D9DDFF] rounded-[30px] border-0 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border border-primary "
                      placeholder="Type Your message here"
                    ></Input>
                    <Button className="bg-transparent p-0 absolute! top-1/2 right-3 -translate-y-1/2   ">
                      <FiSend className=" text-text-muted" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* chat bot icon  */}
            </div>
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
