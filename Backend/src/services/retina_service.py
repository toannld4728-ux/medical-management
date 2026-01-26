import os
import uuid
from services.ai_mock import random_ai_result


class RetinaService:
    def __init__(self, record_repo, image_repo):
        self.record_repo = record_repo
        self.image_repo = image_repo

    def upload_retina(self, patient_id, file, upload_folder):
        ext = os.path.splitext(file.filename)[1]
        filename = f"{uuid.uuid4().hex}{ext}"

        os.makedirs(upload_folder, exist_ok=True)
        path = os.path.join(upload_folder, filename)

        file.save(path)

        record = self.record_repo.create_record(
            patient_id=patient_id,
            notes="Retina uploaded"
        )

        image = self.image_repo.add_image(
            record_id=record.id,
            image_url=path
        )

        return record, image
