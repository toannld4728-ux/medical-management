from flask import Blueprint, request, jsonify
import os
import uuid
from datetime import date

from infrastructure.databases.session import get_session
from infrastructure.repositories.medical_record_repository import MedicalRecordRepository
from infrastructure.repositories.medical_image_repository import MedicalImageRepository

from infrastructure.models.patient_model import PatientModel
from infrastructure.models.user_model import UserModel

bp = Blueprint("retina_upload", __name__, url_prefix="/api/user/retina")


@bp.route("/upload", methods=["POST"])
def upload_retina():
    """
    Upload retina image.

    ---
    tags:
      - Retina
    consumes:
      - multipart/form-data
    parameters:
      - in: formData
        name: file
        type: file
        required: true
    responses:
      200:
        description: Uploaded
    """

    if "file" not in request.files:
        return jsonify({"error": "file is required"}), 400

    file = request.files["file"]

    session = get_session()
    try:
        record_repo = MedicalRecordRepository(session)
        image_repo = MedicalImageRepository(session)

        # ================= GET OR CREATE PATIENT =================

        user = session.query(UserModel).first()
        if not user:
            return jsonify({"error": "No user found in DB. Register user first."}), 400

        patient = session.query(PatientModel).filter_by(user_id=user.id).first()

        if not patient:
            patient = PatientModel(
                user_id=user.id,
                full_name="Test Patient",
                phone="0000000000",
                date_of_birth=date(2000, 1, 1)
            )
            session.add(patient)
            session.commit()

        patient_id = patient.id

        # ================= SAVE FILE =================

        upload_dir = "uploads/retina"
        os.makedirs(upload_dir, exist_ok=True)

        ext = os.path.splitext(file.filename)[1]
        filename = f"{uuid.uuid4().hex}{ext}"
        path = os.path.join(upload_dir, filename)

        file.save(path)

        # ================= CREATE RECORD =================

        record = record_repo.create_record(
            patient_id=patient_id,
            notes="Retina uploaded"
        )

        # ================= CREATE IMAGE =================

        image = image_repo.add_image(
            record_id=record.id,
            image_url=path
        )

        return jsonify({
            "user_id": user.id,
            "patient_id": patient_id,
            "record_id": record.id,
            "image_id": image.id,
            "image_path": path
        })

    finally:
        session.close()
