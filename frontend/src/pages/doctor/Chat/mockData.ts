import { Conversation } from "../../../types/chat";

export const mockConversations: Conversation[] = [
  {
    id: 1,
    title: "Nguyễn Văn A",
    messages: [
      {
        id: 1,
        sender: "user",
        content: "Bác sĩ ơi em lo quá",
        timestamp: Date.now(),
      },
    ],
  },
];
