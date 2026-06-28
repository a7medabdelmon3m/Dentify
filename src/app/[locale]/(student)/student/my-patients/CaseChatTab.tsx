"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, Paperclip, MessageSquareOff } from "lucide-react";
import { Button } from "@/components/ui/button";

// داتا وهمية للرسايل للتجربة
const MOCK_MESSAGES = [
  { id: 1, sender: "patient", text: "السلام عليكم يا دكتور، الضرس لسه بيوجعني مع الماية الساقعة.", time: "10:00 AM" },
  { id: 2, sender: "student", text: "وعليكم السلام، متقلقش ده طبيعي بعد الجلسة الأولى. استمر على المسكن.", time: "10:15 AM" },
];

export default function CaseChatTab() {
  const t = useTranslations("CaseDetails.chatTab");
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // إضافة الرسالة الجديدة للـ State (طبعاً بعدين هتتبعت للـ API)
    const newMessage = {
      id: messages.length + 1,
      sender: "student",
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-[500px] bg-bg-main/30 rounded-2xl border border-border-light overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      
      {/* ── 1. منطقة عرض الرسائل ── */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-text-muted">
            <MessageSquareOff className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm font-medium">{t("emptyChat")}</p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <span className="bg-border-light text-text-muted text-xs px-3 py-1 rounded-full font-bold">
                {t("today")}
              </span>
            </div>
            
            {messages.map((msg) => {
              const isStudent = msg.sender === "student";
              return (
                <div key={msg.id} className={`flex ${isStudent ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      isStudent 
                        ? "bg-primary text-white rounded-br-none rtl:rounded-bl-none rtl:rounded-br-2xl" 
                        : "bg-white border border-border-light text-text-title rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-2xl"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`block text-[10px] mt-1.5 text-end ${isStudent ? "text-white/70" : "text-text-muted"}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* ── 2. منطقة إدخال النص ── */}
      <div className="p-4 bg-white border-t border-border-light">
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          
          <button type="button" className="p-3 text-text-muted hover:text-primary transition-colors bg-bg-main rounded-xl shrink-0">
            <Paperclip className="w-5 h-5" />
            {/* xsssss */}
          </button>
          
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t("inputPlaceholder")}
            className="flex-1 bg-bg-main border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none resize-none min-h-[48px] max-h-[120px]"
            rows={1}
            onKeyDown={(e) => {
              // إرسال بالـ Enter بدون ما تنزل سطر جديد
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          
          <Button type="submit" className="px-5 py-6 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-md shrink-0">
            <Send className="w-5 h-5 rtl:rotate-180" />
          </Button>
          
        </form>
      </div>

    </div>
  );
}