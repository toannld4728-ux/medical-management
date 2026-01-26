from infrastructure.models.chat_room_model import ChatRoomModel
from infrastructure.models.chat_message_model import ChatMessageModel


class ChatRepository:
    def __init__(self, session):
        self.session = session

    def create_room(self):
        room = ChatRoomModel()
        self.session.add(room)
        self.session.commit()
        return room

    def add_message(self, room_id, sender_id, content):
        message = ChatMessageModel(
            room_id=room_id,
            sender_id=sender_id,
            content=content
        )
        self.session.add(message)
        self.session.commit()
        return message

    def get_messages(self, room_id):
        return (
            self.session.query(ChatMessageModel)
            .filter_by(room_id=room_id)
            .order_by(ChatMessageModel.created_at)
            .all()
        )
