from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from infrastructure.databases.base import Base


class ChatRoomModel(Base):
    __tablename__ = 'chat_rooms'

    id = Column(Integer, primary_key=True)

    # 1 phòng chat = 1 patient ↔ 1 doctor
    patient_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    doctor_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    messages = relationship(
        "ChatMessageModel",
        backref="room",
        cascade="all, delete-orphan"
    )
