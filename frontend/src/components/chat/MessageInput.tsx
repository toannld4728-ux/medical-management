import { useState } from "react";

export default function MessageInput({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 border-t flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border rounded-lg px-4 py-2"
        placeholder="Nhập tin nhắn..."
      />
      <button
        onClick={handleSend}
        className="bg-green-600 text-white px-4 rounded-lg"
      >
        Gửi
      </button>
    </div>
  );
}
