from datetime import datetime


class MedicalRecord:
    def __init__(
        self,
        id: int,
        patient_id: int,
        notes: str | None,
        created_at: datetime,
    ):
        self.id = id
        self.patient_id = patient_id
        self.notes = notes
        self.created_at = created_at
