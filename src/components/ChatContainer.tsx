"use client";

import ChatList from "@/components/ChatList";
import Chat from "@/components/ChatPage";
import { Menu } from "lucide-react";
import { useState } from "react";

interface ChatContainerProps {
  params: { id: string };
}

export default function ChatContainer({ params }: ChatContainerProps) {
  const [isChatListOpen, setChatListOpen] = useState(false);
  const { id } = params;

  return (
    <div className="flex h-screen relative">
      <button
        className="absolute top-4 left-4 z-30 p-2 rounded-full bg-[#2c2937] hover:bg-[#3c3947] text-white md:hidden"
        onClick={() => setChatListOpen(!isChatListOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>
      <div
        className={`fixed inset-0 z-20 transform bg-[#2c2937] transition-transform duration-300 ${
          isChatListOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-1/4`}
      >
        <ChatList />
      </div>
      <div
        className={`flex-1 bg-[#12101b] transition-opacity duration-300 ${
          isChatListOpen
            ? "opacity-50 pointer-events-none md:opacity-100"
            : "opacity-100"
        }`}
      >
        <Chat id={id} initialMessages={[]} />
      </div>
    </div>
  );
}
