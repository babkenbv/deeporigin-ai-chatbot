"use client";

import Prompt from "@/components/Prompt";
import { Message } from "ai";
import { useChat } from "ai/react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useChatContext } from "../context/ChatContext";

interface ChatPageProps {
  id: string;
  initialMessages: Message[];
}

const ChatPage = ({ id, initialMessages }: ChatPageProps) => {
  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    isLoading,
    stop,
    handleInputChange,
  } = useChat({
    id,
    body: { id },
    initialMessages,
    onResponse: async (response) => {
      const r = await response.json();
      const newMessage: Message = {
        id: id,
        content: r,
        role: "assistant",
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
  });

  const { chats, setChats } = useChatContext();

  useEffect(() => {
    const firstUserMessage = messages.find(
      (msg) => msg.role === "user"
    )?.content;

    if (
      firstUserMessage &&
      (!chats[id] || chats[id]?.name !== firstUserMessage)
    ) {
      setChats((prevChats) => ({
        ...prevChats,
        [id]: {
          name: chats[id]?.name || firstUserMessage,
          messages,
        },
      }));
    }
  }, [messages, id, chats, setChats]);

  useEffect(() => {
    if (chats[id]?.messages) {
      setMessages(chats[id].messages);
    }
  }, [id, chats, setMessages]);

  return (
    <div className="h-full flex flex-col items-center relative">
      <div className="flex-1 overflow-y-auto w-full flex justify-center px-4 py-4">
        <div className="w-full max-w-2xl flex flex-col">
          {messages.length > 0 &&
            messages.map((message) => (
              <div
                key={message.id}
                className={`p-5 rounded-2xl mb-4 ${
                  message.role === "user"
                    ? "bg-[#2c2947] text-white self-end max-w-[80%]"
                    : "bg-gray-200 text-black max-w-[100%]"
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            ))}
          <Prompt
            input={input}
            isLoading={isLoading}
            handleSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            stop={stop}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
