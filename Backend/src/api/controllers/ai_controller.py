from flask import Blueprint, request, jsonify

from infrastructure.databases.session import get_session
from infrastructure.repositories.medical_image_repository import MedicalImageRepository
from infrastructure.repositories.medical_record_repository import MedicalRecordRepository
from services.ai_service import AIService

bp = Blueprint("ai_retina", __name__, url_prefix="/api/ai")


@bp.route("/analyze-retina", methods=["POST"])
def analyze_retina():
    """
    Analyze retina image by AI (mock).

    ---
    tags:
      - AI
    consumes:
      - application/json
    parameters:
      - in: body
        name: body
        schema:
          type: object
          properties:
            image_id:
              type: integer
              example: 1
    responses:
      200:
        description: AI result
    """

    data = request.get_json() or {}

    image_id = data.get("image_id")
    if not image_id:
        return jsonify({"error": "image_id is required"}), 400

    session = get_session()

    try:
        image_repo = MedicalImageRepository(session)
        record_repo = MedicalRecordRepository(session)

        service = AIService(image_repo, record_repo)

        ai = service.analyze_image(image_id)

        if not ai:
            return jsonify({"error": "Image not found"}), 404

        return jsonify({
            "ai_id": ai.id,
            "image_id": ai.image_id,
            "confidence": ai.confidence,
            "result": ai.raw_output
        })

    finally:
        session.close()
