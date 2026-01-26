import { useState } from "react";
import ConversationList from "../../../components/chat/ConversationList";
import MessageList from "../../../components/chat/MessageList";
import MessageInput from "../../../components/chat/MessageInput";
import { mockConversations } from "./mockData";
import { Conversation } from "../../../types/chat";

export default function DoctorChat() {
  const [data, setData] = useState<Conversation[]>(mockConversations);
  const [selectedId, setSelectedId] = useState<number>(mockConversations[0].id);

  const selectedConversation = data.find((c) => c.id === selectedId);

  const handleSend = (text: string) => {
    setData((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: Date.now(),
                  sender: "doctor",
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
        conversations={data}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <div className="flex flex-col flex-1">
        <div className="p-4 border-b font-semibold">
          {selectedConversation.title}
        </div>
        <MessageList
          messages={selectedConversation.messages}
          currentRole="doctor"
        />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
