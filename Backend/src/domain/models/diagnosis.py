from datetime import datetime


class Diagnosis:
    def __init__(
        self,
        id: int,
        record_id: int,
        result: str,
        created_at: datetime,
    ):
        self.id = id
        self.record_id = record_id
        self.result = result
        self.created_at = created_at
