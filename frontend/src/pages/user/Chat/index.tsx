import { useState } from "react";
import ConversationList from "../../../components/chat/ConversationList";
import MessageList from "../../../components/chat/MessageList";
import MessageInput from "../../../components/chat/MessageInput";
import { Conversation } from "../../../types/chat";

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      title: "BS. Trần Thị Bình",
      messages: [
        {
          id: 1,
          sender: "doctor",
          content: "Chào bạn, tôi đã xem kết quả.",
          timestamp: Date.now(),
        },
      ],
    },
  ]);

  const [selectedId, setSelectedId] = useState<number | null>(1);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedId
  );

  const handleSend = (text: string) => {
    if (selectedId === null) return;

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: Date.now(),
                  sender: "user",
                  content: text,
                  timestamp: Date.now(),
                },
              ],
            }
          : c
      )
    );
  };

  if (!selectedConversation) return null;

  return (
    <div className="flex h-full border rounded-lg overflow-hidden bg-white">
      <ConversationList
        conversations={conversations}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <div className="flex flex-col flex-1">
        <div className="p-4 border-b font-semibold">
          {selectedConversation.title}
        </div>

        <MessageList
          messages={selectedConversation.messages}
          currentRole="user"
        />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
