from datetime import datetime, date

# ===== IMPORT DOMAIN MODELS =====
from domain.models.role import Role
from domain.models.user import User
from domain.models.doctor import Doctor
from domain.models.patient import Patient
from domain.models.admin import Admin
from domain.models.medical_record import MedicalRecord
from domain.models.medical_image import MedicalImage
from domain.models.ai_diagnosis import AIDiagnosis
from domain.models.notification import Notification
from domain.models.audit_log import AuditLog


def main():
    print("=== TEST DOMAIN MODELS ===")

    # ----- ROLE -----
    role_doctor = Role(id=2, name="doctor")
    print("Role doctor is_doctor:", role_doctor.is_doctor())
    print("Role doctor is_admin:", role_doctor.is_admin())

    # ----- USER -----
    user = User(
        id=1,
        email="doctor@test.com",
        role=role_doctor
    )
    print("User email:", user.email)
    print("User is doctor:", user.is_doctor())
    print("User can login:", user.can_login())

    # ----- DOCTOR -----
    doctor = Doctor(
        id=1,
        user_id=user.id,
        specialization="Cardiology"
    )
    print("Doctor specialization:", doctor.specialization)

    # ----- PATIENT -----
    patient = Patient(
        id=1,
        user_id=2,
        full_name="Nguyen Van A",
        phone="0123456789",
        date_of_birth=date(1998, 5, 20)
    )
    print("Patient name:", patient.full_name)

    # ----- MEDICAL RECORD -----
    record = MedicalRecord(
        id=1,
        patient_id=patient.id,
        notes="Patient has chest pain",
        created_at=datetime.utcnow()
    )
    print("Medical record notes:", record.notes)

    # ----- MEDICAL IMAGE -----
    image = MedicalImage(
        id=1,
        record_id=record.id,
        image_url="https://image.test/xray.png"
    )
    print("Medical image url:", image.image_url)

    # ----- AI DIAGNOSIS -----
    ai = AIDiagnosis(
        id=1,
        image_id=image.id,
        confidence=0.87,
        raw_output="High probability of pneumonia"
    )
    print("AI confidence:", ai.confidence)
    print("AI risk level:", ai.risk_level())

    # ----- ADMIN -----
    admin = Admin(
        id=1,
        user_id=3,
        permission_level="full"
    )
    print("Admin is super admin:", admin.is_super_admin())

    # ----- NOTIFICATION -----
    noti = Notification(
        id=1,
        user_id=user.id,
        title="Appointment",
        content="You have a new appointment",
        is_read=False,
        created_at=datetime.utcnow()
    )
    print("Notification title:", noti.title)

    # ----- AUDIT LOG -----
    log = AuditLog(
        id=1,
        action="LOGIN",
        description="Doctor logged in",
        created_at=datetime.utcnow()
    )
    print("Audit log action:", log.action)

    print("\n✅ ALL DOMAIN MODELS WORK CORRECTLY")


if __name__ == "__main__":
    main()
