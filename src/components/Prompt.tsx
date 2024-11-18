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
      <div ref={bottomRef} className="pb-[100px] mt-4"></div>
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-3/4 lg:w-1/2 bg-[#2c2937] rounded-2xl flex items-center gap-3 px-4 py-2 sm:gap-5 sm:px-5 sm:py-3 shadow-lg"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask anything..."
          className="flex-1 p-3 sm:p-5 border-none outline-none bg-transparent text-[#ececec] text-sm sm:text-base"
        />
        {isLoading ? (
          <button
            onClick={stop}
            type="button"
            className="text-gray-300 hover:text-white"
          >
            <Square fill="currentColor" strokeWidth={0} className="h-5 w-5" />
            <span className="sr-only">Stop generating</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={input === ""}
            className={`${
              input === ""
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-white"
            } text-gray-300`}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </button>
        )}
      </form>
    </>
  );
};

export default Prompt;
