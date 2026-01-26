from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from infrastructure.databases.base import Base

class MedicalImageModel(Base):
    __tablename__ = 'medical_images'

    id = Column(Integer, primary_key=True)
    record_id = Column(Integer, ForeignKey('medical_records.id'), nullable=False)
    image_url = Column(String(500), nullable=False)

    record = relationship("MedicalRecordModel", backref="images")
