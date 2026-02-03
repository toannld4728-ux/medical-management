from infrastructure.models.medical_record_model import MedicalRecordModel
from infrastructure.models.diagnosis_model import DiagnosisModel
from sqlalchemy.orm import Session


class MedicalRecordRepository:

    def __init__(self, session: Session):
        self.session = session

    # ================= CREATE =================
    def create_record(self, patient_id, notes):
        record = MedicalRecordModel(
            patient_id=patient_id,
            notes=notes,
            status="pending"
        )
        self.session.add(record)
        self.session.commit()
        return record

    # ================= GET =================
    def get_by_id(self, record_id):
        return (
            self.session.query(MedicalRecordModel)
            .filter_by(id=record_id)
            .first()
        )

    def get_by_patient(self, patient_id):
        return (
            self.session.query(MedicalRecordModel)
            .filter_by(patient_id=patient_id)
            .order_by(MedicalRecordModel.created_at.desc())
            .all()
        )

    # ================= FOR DOCTOR =================
    def get_available_for_doctors(self):
        return (
            self.session.query(MedicalRecordModel)
            .filter(MedicalRecordModel.status == "ai_done")
            .filter(MedicalRecordModel.doctor_id == None)
            .all()
        )

    # ================= LOCK =================
    def lock_record(self, record_id, doctor_id):
        record = self.get_by_id(record_id)

        if not record:
            return None

        if record.doctor_id is not None:
            return "LOCKED"

        record.doctor_id = doctor_id
        record.status = "reviewing"

        self.session.commit()
        return record

    # ================= UPDATE =================
    def update_status(self, record_id, status):
        record = self.get_by_id(record_id)

        if not record:
            return None

        record.status = status
        self.session.commit()
        return record

    # ================= ADD DOCTOR DIAGNOSIS =================
    def add_diagnosis(self, record_id, result):
        diagnosis = DiagnosisModel(
            record_id=record_id,
            result=result
        )

        record = self.get_by_id(record_id)
        record.status = "reviewed"

        self.session.add(diagnosis)
        self.session.commit()
        return diagnosis