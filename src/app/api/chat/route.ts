import { google } from "@ai-sdk/google";
import {
  convertToCoreMessages,
  type Experimental_LanguageModelV1Middleware,
  generateText,
  Message,
  experimental_wrapLanguageModel as wrapLanguageModel,
} from "ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { messages }: { id: string; messages: Array<Message> } =
    await request.json();

  const coreMessages = convertToCoreMessages(messages).filter(
    (message) => message.content.length > 0
  );

  const result = await generateText({
    model: wrapLanguageModel({
      model: google("gemini-1.5-flash-latest"),
      middleware: {} as Experimental_LanguageModelV1Middleware,
    }),
    system:
      "You are a chemical expert. When a user asks for equations or tables of properties render them in the chat with a nice markdown",
    messages: coreMessages,
  });

  return NextResponse.json(result.text);
}
