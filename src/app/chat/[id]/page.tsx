import ChatList from "@/components/ChatList";
import Chat from "@/components/ChatPage";

export default async function Container({ params }: { params: any }) {
  const { id } = params;
  const chatFromDb = { messages: [] };
  return (
    <div className="flex gap-12 pt-5 h-screen">
      <div className="flex">
        <ChatList />
      </div>
      <div className="flex-1 bg-[#12101b]">
        <Chat id={id} initialMessages={chatFromDb.messages} />
      </div>
    </div>
  );
}
