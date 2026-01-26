import { Conversation } from "../../types/chat";

interface Props {
  conversations: Conversation[];
  selectedId: number | null;   // ✅ CHO PHÉP NULL
  onSelect: (id: number) => void;
}

export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: Props) {
  return (
    <div className="w-64 border-r bg-white">
      {conversations.map((c) => {
        const lastMessage =
          c.messages[c.messages.length - 1]?.content ?? "";

        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full text-left p-4 border-b hover:bg-gray-50 ${
              selectedId === c.id ? "bg-green-50" : ""
            }`}
          >
            <p className="font-medium">{c.title}</p>
            <p className="text-xs text-gray-500 truncate">
              {lastMessage}
            </p>
          </button>
        );
      })}
    </div>
  );
}
