import { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export const useChat = (requestId:number, token:string) => {
  const [messages, setMessages] = useState<any[]>([]);
  
  // 1. استخدام useRef بدل useState لحفظ الاتصال من غير Re-render
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    if (!requestId || !token) return;

    // 2. جلب الرسايل القديمة (Chat History)
    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:5123/api/Chat/${requestId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };
    fetchHistory();

    // 3. تأسيس الاتصال
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5123/hubs/chat?requestId=${requestId}`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    // حفظ الاتصال في الـ ref
    connectionRef.current = connection;

    // 4. تشغيل الاتصال والاستماع للرسايل في نفس الـ useEffect
    connection.start()
      .then(() => {
        console.log("Connected to Chat Hub!");
        
        connection.on("ReceiveMessage", (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });
      })
      .catch((err) => console.error("Connection failed: ", err));

    // 5. التنظيف (Cleanup) لما اليوزر يقفل الشات
    return () => {
      if (connection) {
        connection.off("ReceiveMessage"); // وقف الاستماع الأول
        connection.stop();
      }
    };
  }, [requestId, token]);

  // 6. دالة إرسال الرسالة
  const sendMessage = async (content: string) => {
    // بنستخدم connectionRef.current عشان نوصل للاتصال
    if (connectionRef.current && content.trim() !== "") {
      try {
        await connectionRef.current.invoke("SendMessage", Number(requestId), content);
      } catch (error) {
        console.error("Send message failed:", error);
      }
    }
  };

  return { messages, sendMessage };
};