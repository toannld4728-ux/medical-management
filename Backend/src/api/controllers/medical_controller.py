from flask import Blueprint, request, jsonify
from infrastructure.databases.session import get_session
from infrastructure.repositories.medical_record_repository import MedicalRecordRepository
from services.medical_record_service import MedicalRecordService
from api.schemas.medical import MedicalRecordSchema

bp = Blueprint("medical", __name__, url_prefix="/api/medical")


@bp.route("/records", methods=["POST"])
def create_record():
    data = MedicalRecordSchema().load(request.json)

    session = get_session()
    repo = MedicalRecordRepository(session)
    service = MedicalRecordService(repo)

    record = service.create_medical_record(
        data["patient_id"],
        data["doctor_id"],
        data["notes"]
    )

    return jsonify({"id": record.id})
