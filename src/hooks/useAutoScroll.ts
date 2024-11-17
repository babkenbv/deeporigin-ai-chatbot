import type { Message } from "ai";
import { useEffect, useRef } from "react";

export const useAutoScroll = (messages: Message[] = []) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  return { bottomRef };
};
