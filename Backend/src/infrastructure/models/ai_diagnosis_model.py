from sqlalchemy import Column, Integer, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from infrastructure.databases.base import Base

class AIDiagnosisModel(Base):
    __tablename__ = 'ai_diagnoses'

    id = Column(Integer, primary_key=True)
    image_id = Column(Integer, ForeignKey('medical_images.id'), nullable=False)
    confidence = Column(Float, nullable=False)
    raw_output = Column(Text)

    image = relationship("MedicalImageModel", backref="ai_diagnoses")
