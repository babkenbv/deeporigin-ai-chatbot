"use client";

import { useAutoScroll } from "@/hooks/useAutoScroll";
import { Send, Square } from "lucide-react";

interface PromptProps {
  input: string;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  stop: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Prompt = ({
  input,
  isLoading,
  handleSubmit,
  stop,
  handleInputChange,
}: PromptProps) => {
  const { bottomRef } = useAutoScroll();

  return (
    <>
      <div ref={bottomRef} className="pb-[100px]"></div>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 absolute bottom-0 bg-[#2c2937] rounded-2xl flex items-center gap-5 px-5 py-0"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask anything..."
          className="flex-1 p-5 border-none outline-none bg-transparent text-[#ececec]"
        />
        {isLoading ? (
          <button onClick={stop} type="submit">
            <Square fill="currentColor" strokeWidth={0} className="h-4 w-4" />
            <span className="sr-only">Stop generating</span>
          </button>
        ) : (
          <button type="submit" disabled={input === ""}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </button>
        )}
      </form>
    </>
  );
};

export default Prompt;
