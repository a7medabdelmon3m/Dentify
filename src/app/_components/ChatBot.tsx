"use client";

import React, { useState, useRef, useEffect } from "react";
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
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatBotBtn from "./ChatBotBtn";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions"; 
import { useParams } from "next/navigation";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
}

export function ChatBot() {
  const { chatIsOpen, setchatIsOpen } = usePatientCont();
  const t = useTranslations("chatBot");

  const params = useParams() ;
  const {locale} = params

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    { id: Date.now(), sender: "ai", text: t("hiThere") || "أهلاً بك في Dentify AI Assistant! إزاي أقدر أساعدك النهاردة؟" },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    
    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: userMessage }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const historyString = messages
        .map((msg) => `${msg.sender === "user" ? "User" : "AI"}: ${msg.text}`)
        .join("\n");

      const payload = {
        question: userMessage,
        history: historyString,
      };

      const response = await dynamicApiAction("ChatBot", "POST", undefined, payload);

       const aiAnswer = (response as any)?.answer ?? (response as any)?.data?.answer ?? "عذراً، لم أتمكن من فهم طلبك.";
      
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "ai", text: aiAnswer },
      ]);
    } catch (error) {
      console.error("ChatBot Error:", error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "ai", text: "حدث خطأ في الاتصال، يرجى المحاولة لاحقاً." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={chatIsOpen} onOpenChange={setchatIsOpen}>
      <PopoverTrigger className="border-none! h-auto! focus-visible:outline-0 focus:ring-0" asChild>
        <Button variant="outline"><ChatBotBtn /></Button>
      </PopoverTrigger>

      <PopoverContent className="bg-white border border-border-light p-4 shadow-2xl rounded-3xl w-[380px]" align="end">
        <PopoverHeader className="p-0">
          
          <div className="flex justify-between items-center mb-4 px-2">
            <PopoverTitle className="font-heading font-bold text-2xl text-text-title">
              {t("title")}
            </PopoverTitle>
            <TfiArrowCircleLeft 
              onClick={() => setchatIsOpen(false)}
              className="text-text-muted hover:text-danger cursor-pointer transition-colors rtl:rotate-180 w-6 h-6" 
            />
          </div>

          <div className="text-start">
            <div className="space-y-1 ps-2 mb-6">
              <h4 className="text-sm font-bold text-text-body">{t("description")}</h4>
              <p className="text-xs text-text-muted">{new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="bg-bg-main border border-border-light rounded-2xl p-4 mb-4 h-[50vh] overflow-y-auto no-scrollbar flex flex-col gap-4">
              
              <div className="flex justify-end gap-3 text-text-muted mb-2">
                <BsUpload className="hover:text-primary cursor-pointer transition-colors w-4 h-4" />
                <GoMute className="hover:text-primary cursor-pointer transition-colors w-4 h-4" />
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end text-end" : "justify-start text-start"}`}>
                  
                  {msg.sender === "ai" && (
                    <div className="w-8 h-8 relative shrink-0 bg-white rounded-full p-1 border border-border-light shadow-sm">
                      <Image fill sizes="32px" className="object-contain" src={model} alt="Ai Icon" />
                    </div>
                  )}

                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm font-medium leading-relaxed shadow-sm ${
                    msg.sender === "user" 
                      ? "bg-primary text-white rounded-br-none" 
                      : "bg-white border border-border-light text-text-title rounded-bl-none"
                  }`}>
                    {msg.text}
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-8 h-8 relative flex justify-center items-center rounded-full overflow-hidden shrink-0 border border-border-light shadow-sm">
                      <Image fill sizes="32px" className="object-cover" src={user} alt="User Icon" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start text-start">
                   <div className="w-8 h-8 relative shrink-0 bg-white rounded-full p-1 border border-border-light shadow-sm">
                      <Image fill sizes="32px" className="object-contain" src={model} alt="Ai Icon" />
                    </div>
                  <div className="p-3 rounded-2xl bg-white border border-border-light text-text-muted text-sm font-medium rounded-bl-none flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2 items-center bg-white p-2 rounded-2xl border border-border-light shadow-sm">
              <label htmlFor="voice">
                <div className="flex gap-2.5 w-10 h-10 shrink-0 rounded-full items-center justify-center bg-bg-main text-text-muted hover:bg-primary-subtle hover:text-primary transition-colors cursor-pointer">
                  <FaMicrophone />
                </div>
              </label>
              <Input id="voice" type="file" className="hidden" />
              
              <div className="relative flex-1">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  className="py-3 ps-4 pe-12 bg-bg-main rounded-xl border-none focus-visible:ring-1 focus-visible:ring-primary/30 text-text-title text-sm"
                  placeholder={t("placeholder") || "اكتب سؤالك هنا..."}
                  autoComplete="off"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !inputValue.trim()}
                  className={`bg-transparent p-2 absolute top-1/2 ${locale === 'ar' ? 'left-2' : 'right-2' }  -translate-y-1/2 hover:bg-primary-subtle rounded-lg h-auto transition-colors`}
                >
                  <FiSend className={`w-5 h-5 ${inputValue.trim() ? "text-primary" : "text-text-muted"}`} />
                </Button>
              </div>
            </form>

          </div>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}