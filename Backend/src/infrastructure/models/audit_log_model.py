from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from infrastructure.databases.base import Base

class AuditLogModel(Base):
    __tablename__ = 'audit_logs'

    id = Column(Integer, primary_key=True)
    action = Column(String(255), nullable=False)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
