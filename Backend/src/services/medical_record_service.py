from infrastructure.repositories.medical_record_repository import MedicalRecordRepository


class MedicalRecordService:
    def __init__(self, repo: MedicalRecordRepository):
        self.repo = repo

    def create(self, patient_id: int, doctor_id: int, notes: str = ""):
        return self.repo.create_record(patient_id, doctor_id, notes)
