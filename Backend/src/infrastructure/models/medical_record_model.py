from sqlalchemy import Column, Integer, Text, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from infrastructure.databases.base import Base


class MedicalRecordModel(Base):
    __tablename__ = 'medical_records'

    id = Column(Integer, primary_key=True)

    patient_id = Column(Integer, ForeignKey('patients.id'), nullable=False)

    # bác sĩ phụ trách (có thể null khi AI chưa xử lý xong)
    doctor_id = Column(Integer, ForeignKey('doctors.id'), nullable=True)

    # trạng thái để FE hiển thị
    status = Column(
        String(50),
        default="pending"
    )
    # pending | ai_done | reviewed

    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship(
        "PatientModel",
        backref="medical_records"
    )
