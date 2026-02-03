from infrastructure.models.medical_record_model import MedicalRecordModel


class HistoryService:
    def __init__(self, record_repo, image_repo):
        self.record_repo = record_repo
        self.image_repo = image_repo

    # ================= LIST FOR PATIENT =================
    def get_patient_history(self, patient_id):
        records = self.record_repo.get_by_patient(patient_id)
        return records

    # ================= DETAIL =================
    def get_history_detail(self, record_id):
        record = self.record_repo.get_by_id(record_id)

        if not record:
            return None

        images = self.image_repo.get_by_record(record_id)

        diagnoses = record.diagnoses

        return record, images, diagnoses