"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useSignalRChat, MessageType } from "@/hooks/useSignalRChat";

interface ChatTabProps {
  requestId: number;
  initialMessages: MessageType[];
  currentUserId: string | number;
  token?: string; 
}

export default function ChatTab({ requestId, initialMessages, currentUserId, token = "" }: ChatTabProps) {
  const t = useTranslations("chat");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);

  const handleReceiveMessage = useCallback((newMessage: MessageType) => {
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const { sendMessage, isConnected } = useSignalRChat(requestId, token, handleReceiveMessage);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !isConnected) return;

    await sendMessage(inputValue);
    
    setInputValue("");
  };

  return (
    <div className="flex flex-col border-x border-border-light bg-white h-[450px]">
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        {messages.map((msg) => {
          const isMine = String(msg.senderId) === String(currentUserId); 
          
          return (
            <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div 
                className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  isMine 
                    ? "bg-primary text-white rounded-br-none rtl:rounded-bl-none rtl:rounded-br-2xl" 
                    : "bg-bg-main text-text-title border border-border-light rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-2xl"
                }`}
              >
                <p>{msg.content}</p>
                <span className={`block text-[10px] mt-1.5 text-end ${isMine ? "text-white/70" : "text-text-muted"}`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-y border-border-light">
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <button type="button" className="p-3 text-text-muted hover:text-primary transition-colors bg-bg-main rounded-xl shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <textarea 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-bg-main border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none resize-none min-h-[48px] max-h-[120px]"
            placeholder={isConnected ? t("inputPlaceholder") : "جاري الاتصال بالخادم..."}
            rows={1}
            disabled={!isConnected} 
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          
          <Button type="submit" disabled={!inputValue.trim() || !isConnected} className="px-5 py-6 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-md shrink-0">
            <Send className="w-5 h-5 rtl:rotate-180" />
          </Button>
        </form>
      </div>
    </div>
  );
}