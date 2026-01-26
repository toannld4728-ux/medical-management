from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from infrastructure.databases.base import Base

class DiagnosisModel(Base):
    __tablename__ = 'diagnoses'

    id = Column(Integer, primary_key=True)
    record_id = Column(Integer, ForeignKey('medical_records.id'), nullable=False)
    result = Column(Text, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    record = relationship("MedicalRecordModel", backref="diagnoses")
