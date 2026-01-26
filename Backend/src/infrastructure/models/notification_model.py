from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from datetime import datetime
from infrastructure.databases.base import Base


class NotificationModel(Base):
    __tablename__ = 'notifications'

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    # loại thông báo: result | chat | system
    type = Column(String(50), default="system")

    title = Column(String(255), nullable=False)
    content = Column(String(500), nullable=False)

    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
