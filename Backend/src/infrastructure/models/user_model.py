from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from infrastructure.databases.base import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(20), nullable=False)
    password_hash = Column(String(255), nullable=False)

    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)

    role = relationship("RoleModel", back_populates="users")

    doctor = relationship("DoctorModel", back_populates="user", uselist=False)
    admin = relationship("AdminModel", back_populates="user", uselist=False)
    clinic = relationship("ClinicModel", back_populates="user", uselist=False)
