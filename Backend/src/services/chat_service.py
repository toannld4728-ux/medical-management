from infrastructure.repositories.chat_repository import ChatRepository


class ChatService:
    def __init__(self, repo: ChatRepository):
        self.repo = repo

    def create_room(self, patient_id: int, doctor_id: int):
        return self.repo.create_room(patient_id, doctor_id)

    def send(self, room_id: int, sender_id: int, content: str):
        return self.repo.add_message(room_id, sender_id, content)

    def get_messages(self, room_id: int):
        return self.repo.get_messages(room_id)
