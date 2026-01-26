from infrastructure.repositories.medical_image_repository import MedicalImageRepository


class MedicalImageService:
    def __init__(self, repo: MedicalImageRepository):
        self.repo = repo

    def upload(self, record_id: int, path: str, image_type: str):
        return self.repo.add_image(record_id, path, image_type)
