"use client";

import Prompt from "@/components/Prompt";
import { Message } from "ai";
import { useChat } from "ai/react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";

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

  useEffect(() => {
    const storedChats: Record<string, { name: string; messages: Message[] }> =
      JSON.parse(localStorage.getItem("chats") || "{}");
    const firstUserMessage = messages.find(
      (msg) => msg.role === "user"
    )?.content;

    if (firstUserMessage) {
      localStorage.setItem(
        "chats",
        JSON.stringify({
          ...storedChats,
          [id]: {
            name: firstUserMessage,
            messages,
          },
        })
      );
    }
  }, [messages, id]);

  useEffect(() => {
    const storedChats: Record<string, { name: string; messages: Message[] }> =
      JSON.parse(localStorage.getItem("chats") || "{}");
    if (storedChats[id]?.messages) {
      setMessages(storedChats[id].messages);
    }
  }, [id, setMessages]);

  return (
    <div className="h-full flex flex-col items-center relative scrollbar-hide">
      <div className="flex-1 overflow-y-scroll w-full flex justify-center scrollbar-hide">
        <div className="w-1/2 flex flex-col">
          {messages.length > 0 &&
            messages.map((message) => (
              <div
                key={message.id} // Use message.id for unique key
                className={`p-5 rounded-2xl mb-10 ${
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
