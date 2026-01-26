from flask import Blueprint, request, jsonify
from flasgger import swag_from

from services.doctor_service import DoctorService

bp = Blueprint("doctor", __name__, url_prefix="/api/doctor")


# ================= LIST CASES =================
@bp.route("/cases", methods=["GET"])
@swag_from({
    "tags": ["Doctor"],
    "summary": "List medical records waiting for doctor review",
    "responses": {
        200: {
            "description": "List cases",
            "schema": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "record_id": {"type": "integer"},
                        "patient_id": {"type": "integer"},
                        "status": {"type": "string"},
                        "doctor_id": {"type": ["integer", "null"]}
                    }
                }
            }
        }
    }
})
def list_cases():

    records = DoctorService.get_available_cases()

    return jsonify([
        {
            "record_id": r.id,
            "patient_id": r.patient_id,
            "status": r.status,
            "doctor_id": r.doctor_id
        }
        for r in records
    ])


# ================= CONFIRM =================
@bp.route("/confirm/<int:record_id>", methods=["POST"])
@swag_from({
    "tags": ["Doctor"],
    "summary": "Doctor confirms diagnosis result",
    "parameters": [
        {
            "name": "record_id",
            "in": "path",
            "required": True,
            "type": "integer"
        },
        {
            "name": "body",
            "in": "body",
            "schema": {
                "type": "object",
                "required": ["doctor_id", "result"],
                "properties": {
                    "doctor_id": {"type": "integer"},
                    "result": {"type": "string"}
                }
            }
        }
    ],
    "responses": {
        200: {"description": "Confirmed"},
        400: {"description": "Doctor not found"},
        404: {"description": "Record not found"}
    }
})
def confirm_case(record_id):

    data = request.json or {}

    doctor_user_id = data.get("doctor_id")
    result = data.get("result")

    if not doctor_user_id or not result:
        return jsonify({"error": "doctor_id and result required"}), 400

    record = DoctorService.confirm_case(
        record_id=record_id,
        doctor_user_id=doctor_user_id,
        result=result
    )

    if record == "DOCTOR_NOT_FOUND":
        return jsonify({"error": "Doctor not found"}), 400

    if not record:
        return jsonify({"error": "Record not found"}), 404

    return jsonify({
        "message": "Confirmed",
        "record_id": record_id
    })
