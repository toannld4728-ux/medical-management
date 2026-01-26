from pydantic import BaseModel


class MedicalRecordCreateRequest(BaseModel):
    patient_id: int
    doctor_id: int
    notes: str = ""
