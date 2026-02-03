from flask import Blueprint, jsonify, request
from infrastructure.databases.session import get_session

from infrastructure.repositories.medical_record_repository import MedicalRecordRepository
from infrastructure.repositories.medical_image_repository import MedicalImageRepository
from services.history_service import HistoryService

bp = Blueprint("history_retina", __name__, url_prefix="/api/user")


# ================= LIST =================
@bp.route("/history", methods=["GET"])
def get_patient_history():

    patient_id = request.args.get("patient_id", type=int)

    if not patient_id:
        return jsonify({"error": "patient_id required"}), 400

    session = get_session()

    try:
        record_repo = MedicalRecordRepository(session)
        image_repo = MedicalImageRepository(session)

        service = HistoryService(record_repo, image_repo)

        records = service.get_patient_history(patient_id)

        return jsonify({
            "records": [
                {
                    "id": r.id,
                    "status": r.status,
                    "created_at": r.created_at.isoformat(),
                    "notes": r.notes
                }
                for r in records
            ]
        })

    finally:
        session.close()


# ================= DETAIL =================
@bp.route("/history/<int:record_id>", methods=["GET"])
def get_history_detail(record_id):

    session = get_session()

    try:
        record_repo = MedicalRecordRepository(session)
        image_repo = MedicalImageRepository(session)

        service = HistoryService(record_repo, image_repo)

        result = service.get_history_detail(record_id)

        if not result:
            return jsonify({"error": "Record not found"}), 404

        record, images, diagnoses = result

        return jsonify({
            "record_id": record.id,
            "patient_id": record.patient_id,
            "notes": record.notes,
            "status": record.status,
            "created_at": record.created_at.isoformat(),

            "images": [
                {
                    "id": img.id,
                    "url": img.image_url,
                    "ai_results": [
                        {
                            "id": ai.id,
                            "confidence": ai.confidence,
                            "raw_output": ai.raw_output
                        }
                        for ai in img.ai_diagnoses
                    ]
                }
                for img in images
            ],

            "doctor_diagnoses": [
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