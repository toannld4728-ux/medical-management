from flask import Blueprint, jsonify
from infrastructure.databases.session import get_session

from infrastructure.repositories.medical_record_repository import MedicalRecordRepository
from infrastructure.repositories.medical_image_repository import MedicalImageRepository
from services.history_service import HistoryService

bp = Blueprint("history_retina", __name__, url_prefix="/api/user")


@bp.route("/history/<int:record_id>", methods=["GET"])
def get_history(record_id):
    """
    Get diagnosis history of patient.

    ---
    tags:
      - History
    parameters:
      - in: path
        name: record_id
        type: integer
        required: true
    responses:
      200:
        description: History list
    """

    session = get_session()

    try:
        record_repo = MedicalRecordRepository(session)
        image_repo = MedicalImageRepository(session)

        service = HistoryService(record_repo, image_repo)

        record, images, diagnoses = service.get_history(record_id)

        if not record:
            return jsonify({"error": "Record not found"}), 404

        return jsonify({
            "record_id": record.id,
            "patient_id": record.patient_id,
            "notes": record.notes,
            "images": [
                {"id": img.id, "url": img.image_url}
                for img in images
            ],
            "diagnoses": [
                {
                    "id": d.id,
                    "result": d.result,
                    "created_at": d.created_at.isoformat()
                }
                for d in diagnoses
            ]
        })

    finally:
        session.close()
