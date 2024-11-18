"use client";

import Prompt from "@/components/Prompt";
import { Message } from "ai";
import { useChat } from "ai/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useChatContext } from "../context/ChatContext";

interface ChatPageProps {
  id: string;
  initialMessages: Message[];
}

const ChatPage = ({ id, initialMessages }: ChatPageProps) => {
  const { chats, setChats } = useChatContext();

  const getInitialMessages = (): Message[] => {
    const storedChats = localStorage.getItem("chats");
    if (storedChats) {
      const parsedChats = JSON.parse(storedChats);
      return parsedChats[id]?.messages || initialMessages;
    }
    return initialMessages;
  };

  const [messages, setMessages] = useState<Message[]>(getInitialMessages);

  const syncChatState = (updatedMessages: Message[]) => {
    const updatedChats = {
      ...chats,
      [id]: {
        name: chats[id]?.name || updatedMessages[0]?.content || "New Chat",
        messages: updatedMessages,
      },
    };

    localStorage.setItem("chats", JSON.stringify(updatedChats));
    setChats(updatedChats);
  };

  const { handleSubmit, input, isLoading, stop, handleInputChange } = useChat({
    id,
    body: { id },
    initialMessages: messages,
    onResponse: async (response) => {
      const r = await response.json();
      const newMessage: Message = {
        id: Date.now().toString(),
        content: r,
        role: "assistant",
      };

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        syncChatState(updatedMessages);
        return updatedMessages;
      });
    },
  });

  return (
    <div className="h-full flex flex-col items-center relative">
      <div className="flex-1 overflow-y-auto w-full flex justify-center px-4 py-4 scrollbar-hidden">
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
              const newUserMessage: Message = {
                id: Date.now().toString(),
                content: input,
                role: "user",
              };

              setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, newUserMessage];
                syncChatState(updatedMessages);
                return updatedMessages;
              });

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
