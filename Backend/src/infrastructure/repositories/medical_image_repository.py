from infrastructure.models.medical_image_model import MedicalImageModel
from infrastructure.models.ai_diagnosis_model import AIDiagnosisModel


class MedicalImageRepository:
    def __init__(self, session):
        self.session = session

    # ================= ADD IMAGE =================
    def add_image(self, record_id, image_url):
        image = MedicalImageModel(
            record_id=record_id,
            image_url=image_url
        )
        self.session.add(image)
        self.session.commit()
        return image

    # ================= GET BY RECORD =================
    def get_by_record(self, record_id):
        return (
            self.session.query(MedicalImageModel)
            .filter_by(record_id=record_id)
            .all()
        )

    # ================= GET BY ID =================
    def get_by_id(self, image_id):
        return (
            self.session.query(MedicalImageModel)
            .filter_by(id=image_id)
            .first()
        )

    # ================= SAVE AI RESULT =================
    def save_ai_result(self, image_id, confidence, raw_output):
        ai = AIDiagnosisModel(
            image_id=image_id,
            confidence=confidence,
            raw_output=raw_output
        )
        self.session.add(ai)
        self.session.commit()
        return ai
