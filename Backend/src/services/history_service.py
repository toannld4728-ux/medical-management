class HistoryService:
    def __init__(self, record_repo, image_repo):
        self.record_repo = record_repo
        self.image_repo = image_repo

    def get_history(self, record_id):
        record = self.record_repo.get_by_id(record_id)
        images = self.image_repo.get_by_record(record_id)

        diagnoses = []
        if record:
            diagnoses = record.diagnoses

        return record, images, diagnoses
