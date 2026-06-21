"use client";
import React from "react";
import { usePatientCont } from "../contexts/patientContext";
import Image from "next/image";
import chatBot from "@/assets/images/chat-bot.gif";

export default function ChatBotBtn() {
  const { chatIsOpen, setchatIsOpen } = usePatientCont();

  return (
    <div title="Chat With Denty">
      <div
        onClick={() => {
          setchatIsOpen(!chatIsOpen);
          console.log("el chatbot is open : ", chatIsOpen);
        }}
        className="relative w-10 h-10 overflow-hidden rounded-full cursor-pointer"
      >
        <Image src={chatBot} alt="chat bot"></Image>
      </div>
    </div>
  );
}
