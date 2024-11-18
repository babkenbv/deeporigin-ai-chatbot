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
        className="p-2 rounded-lg bg-[#28273d] text-white hover:bg-[#2c2937] transition duration-300"
      >
        Create a new chat
      </button>
      <hr className="border-none h-[2px] bg-gray-300 opacity-10 rounded-md my-5" />
      <div className="flex flex-col overflow-y-auto scrollbar-hide">
        {Object.keys(chats).map((key) => (
          <Link
            key={key}
            href={`/chat/${key}`}
            className="p-2 rounded-lg hover:bg-[#2c2937] transition duration-300 text-gray-300 text-sm"
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
