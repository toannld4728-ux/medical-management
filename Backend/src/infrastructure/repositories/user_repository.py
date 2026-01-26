from infrastructure.models.user_model import UserModel
from infrastructure.models.role_model import RoleModel
from infrastructure.models.doctor_model import DoctorModel
from infrastructure.models.patient_model import PatientModel
from infrastructure.models.admin_model import AdminModel


class UserRepository:
    def __init__(self, session):
        self.session = session

    # ---------- USER ----------
    def create_user(self, email, password_hash, role_name):
        role = (
            self.session.query(RoleModel)
            .filter_by(name=role_name)
            .first()
        )
        if not role:
            raise Exception("Role not found")

        user = UserModel(
            email=email,
            password_hash=password_hash,
            role_id=role.id
        )
        self.session.add(user)
        self.session.commit()
        return user

    def get_by_email(self, email):
        return self.session.query(UserModel).filter_by(email=email).first()

    def get_by_id(self, user_id):
        return self.session.query(UserModel).filter_by(id=user_id).first()

    # ---------- PROFILE ----------
    def create_doctor(self, user_id, specialization):
        doctor = DoctorModel(
            user_id=user_id,
            specialization=specialization
        )
        self.session.add(doctor)
        self.session.commit()
        return doctor

    def create_patient(self, user_id, full_name, phone, dob):
        patient = PatientModel(
            user_id=user_id,
            full_name=full_name,
            phone=phone,
            date_of_birth=dob
        )
        self.session.add(patient)
        self.session.commit()
        return patient

    def create_admin(self, user_id, permission_level="full"):
        admin = AdminModel(
            user_id=user_id,
            permission_level=permission_level
        )
        self.session.add(admin)
        self.session.commit()
        return admin
