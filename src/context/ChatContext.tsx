"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Chat {
  name: string;
  messages: any[];
}

interface ChatContextProps {
  chats: { [key: string]: Chat };
  setChats: React.Dispatch<React.SetStateAction<{ [key: string]: Chat }>>;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<{ [key: string]: Chat }>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("chats") || "{}");
    }
    return {};
  });

  // Sync with localStorage whenever chats are updated
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  return (
    <ChatContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
