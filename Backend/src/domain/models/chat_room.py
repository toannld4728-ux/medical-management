from datetime import datetime


class ChatRoom:
    def __init__(self, id: int):
        self.id = id


class ChatMessage:
    def __init__(
        self,
        id: int,
        room_id: int,
        sender_id: int,
        content: str,
        created_at: datetime,
    ):
        self.id = id
        self.room_id = room_id
        self.sender_id = sender_id
        self.content = content
        self.created_at = created_at
