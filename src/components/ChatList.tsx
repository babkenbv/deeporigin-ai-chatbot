"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ChatList = () => {
  const params = useParams();
  const currentChatId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [chats, setChats] = useState<{ [key: string]: { name: string } }>({});
  const [canCreateChat, setCanCreateChat] = useState(false);

  const shortenString = (str: string, maxLength: number) => {
    if (str) {
      return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
    }
    return;
  };

  // Load chats from localStorage
  useEffect(() => {
    // Load saved chats
    const storedChats = JSON.parse(localStorage.getItem("chats") || "{}");
    setChats(storedChats);

    // Check the current chat separately
    let currentChatHasMessages = false;

    if (currentChatId && storedChats[currentChatId]) {
      currentChatHasMessages =
        storedChats[currentChatId].messages &&
        storedChats[currentChatId].messages.length > 0;
    }

    setCanCreateChat(currentChatHasMessages);
  }, [currentChatId]);

  return (
    <div className="flex flex-col h-full">
      <button
        onClick={() => {
          const newId = uuidv4();
          window.location.assign(`/chat/${newId}`);
        }}
        className={`p-2 rounded-lg ${
          canCreateChat
            ? "hover:bg-[#2c2937] transition duration-300"
            : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!canCreateChat}
      >
        Create a new chat
      </button>
      <hr className="border-none h-[2px] bg-gray-300 opacity-10 rounded-md my-5" />
      <div className="flex flex-col overflow-y-scroll scrollbar-hide">
        {Object.keys(chats).map((key) => (
          <Link
            key={key}
            href={`/chat/${key}`}
            className="p-2 rounded-lg hover:bg-[#2c2937] transition duration-300 $"
            title={chats[key]?.name}
          >
            {shortenString(chats[key]?.name, 20)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
