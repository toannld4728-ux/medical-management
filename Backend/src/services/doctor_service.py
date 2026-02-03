from infrastructure.repositories.medical_record_repository import MedicalRecordRepository
from infrastructure.databases.session import SessionLocal
from infrastructure.models.doctor_model import DoctorModel


class DoctorService:

    # ================= LIST =================
    @staticmethod
    def get_available_cases():
        session = SessionLocal()
        try:
            repo = MedicalRecordRepository(session)
            return repo.get_available_for_doctors()
        finally:
            session.close()

    # ================= CONFIRM =================
    @staticmethod
    def confirm_case(record_id, doctor_id, result):

        session = SessionLocal()

        try:
            doctor = (
                session
                .query(DoctorModel)
                .filter(DoctorModel.id == doctor_id)
                .first()
            )

            if not doctor:
                return "DOCTOR_NOT_FOUND"

            repo = MedicalRecordRepository(session)

            record = repo.get_by_id(record_id)

            if not record:
                return None

            # ================= UPDATE RECORD =================
            record.doctor_id = doctor.id
            record.notes = result
            record.status = "reviewed"

            # ================= SAVE DIAGNOSIS HISTORY 🔥 =================
            repo.add_diagnosis(
                record_id=record.id,
                result=result
            )

            session.commit()

            return record

        finally:
            session.close()