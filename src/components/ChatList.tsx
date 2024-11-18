"use client";

import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useChatContext } from "../context/ChatContext";

const ChatList = () => {
  const { chats } = useChatContext();

  const shortenString = (str: string, maxLength: number) => {
    if (str) {
      return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
    }
    return "";
  };

  return (
    <div className="flex flex-col h-full p-4">
      <button
        onClick={() => {
          const newId = uuidv4();
          window.location.assign(`/chat/${newId}`);
        }}
        className="p-2 rounded-lg bg-[#474656] text-white hover:bg-[#18171e] transition duration-300"
      >
        Create a new chat
      </button>
      <hr className="border-none h-[2px] bg-gray-300 opacity-10 rounded-md my-5" />
      <div className="flex flex-col overflow-y-auto scrollbar-hidden">
        {Object.keys(chats).map((key) => (
          <Link
            key={key}
            href={`/chat/${key}`}
            className="no-underline my-2 flex items-center justify-center p-4 px-6 rounded-lg bg-[#474656] text-white text-sm font-medium transition duration-300 transform hover:bg-[#18171e]"
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
