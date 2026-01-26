export type Sender = "user" | "doctor";

export interface Message {
  id: number | string;
  sender: Sender;
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: number;
  title: string;        // 👈 tên hiển thị (BS hoặc bệnh nhân)
  messages: Message[];  // 👈 LUÔN CÓ
}
