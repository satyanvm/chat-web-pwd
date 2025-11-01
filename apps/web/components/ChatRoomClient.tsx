"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { prismaClient } from "db/client";

export default function ChatRoomClient({
  userId,
  messages,
  id,
}: {
  userId: number;
  messages: string[];
  id: number;
}) {
  const { socket, loading } = useSocket();
  const [chats, setChats] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          setChats((c) => [...c, parsedData]);
        }
        prismaClient.chat.create({
          roomId: id,
          userId: userId,
          message: parsedData,
        });
      };
    }
    return () => {
      socket?.close();
    };
  }, [socket, loading, id]);

  return (
    <div>
      {chats.map((chat, index) => (
        <p key = {index}>{chat}</p>
      ))}

      <input
        type="text"
        value={currentMessage}
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
      ></input>

      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "chat",
              roomId: id,
              message: currentMessage,
            })
          );

          setCurrentMessage("");
        }}
      >
        Send Message
      </button>
    </div>
  );
}
