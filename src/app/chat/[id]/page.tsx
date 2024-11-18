import ChatContainer from "@/components/ChatContainer";
import { ChatProvider } from "@/context/ChatContext";

export default async function Container({ params }: { params: any }) {
  return (
    <ChatProvider>
      <ChatContainer params={params} />
    </ChatProvider>
  );
}
