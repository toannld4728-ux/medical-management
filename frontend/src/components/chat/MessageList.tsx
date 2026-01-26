import { Message, Sender } from "../../types/chat";

interface Props {
  messages: Message[];
  currentRole: Sender; // "user" | "doctor"
}

export default function MessageList({ messages, currentRole }: Props) {
  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
      {messages.map((msg) => {
        const isMine = msg.sender === currentRole;

        return (
          <div
            key={msg.id}
            className={`flex ${
              isMine ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-[70%] text-sm ${
                isMine
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-white border rounded-bl-none"
              }`}
            >
              <p className="break-words whitespace-pre-wrap">
                {msg.content}
              </p>

              <div className="text-[10px] opacity-70 mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
