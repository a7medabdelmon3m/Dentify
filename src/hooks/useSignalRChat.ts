import { useEffect, useRef, useState, useCallback } from "react";
import * as signalR from "@microsoft/signalr";

export interface MessageType {
  id: number;
  senderId: string | number;
  content: string;
  createdAt: string;
}

export const useSignalRChat = (
  requestId: number,
  token: string, // التوكن عشان الـ Authorize اللي على الـ Hub
  onMessageReceived: (message: MessageType) => void,
) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5123/hubs/chat?requestId=${requestId}`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = newConnection;

    newConnection
      .start()
      .then(() => {
        console.log("SignalR Connected!");
        setIsConnected(true);

        // الاستماع للرسايل اللي جاية
        newConnection.on("ReceiveMessage", (message: MessageType) => {
          onMessageReceived(message);
        });
      })
      .catch((e) => console.error("SignalR Connection Error: ", e));

    return () => {
      newConnection.off("ReceiveMessage");
      newConnection.stop();
    };
  }, [requestId, token, onMessageReceived]);

  const sendMessage = useCallback(
    async (content: string) => {
      const connection = connectionRef.current;

      if (
        connection &&
        connection.state === signalR.HubConnectionState.Connected
      ) {
        try {
          await connection.invoke("SendMessage", requestId, content);
        } catch (e) {
          console.error("Sending message failed:", e);
        }
      } else {
        console.warn("SignalR is not connected yet.");
      }
    },
    [requestId],
  );

  return { sendMessage, isConnected };
};
