class MedicalImage:
    def __init__(
        self,
        id: int,
        record_id: int,
        image_url: str,
    ):
        self.id = id
        self.record_id = record_id
        self.image_url = image_url
