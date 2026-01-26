class AIDiagnosis:
    def __init__(
        self,
        id: int,
        image_id: int,
        confidence: float,
        raw_output: str | None,
    ):
        self.id = id
        self.image_id = image_id
        self.confidence = confidence
        self.raw_output = raw_output

    def risk_level(self) -> str:
        if self.confidence >= 0.8:
            return "high"
        if self.confidence >= 0.5:
            return "medium"
        return "low"
