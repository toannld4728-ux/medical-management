from flask import Blueprint, request, jsonify
import os
import uuid
from datetime import date

from infrastructure.databases.session import get_session
from infrastructure.repositories.medical_record_repository import MedicalRecordRepository
from infrastructure.repositories.medical_image_repository import MedicalImageRepository

from infrastructure.models.patient_model import PatientModel
from infrastructure.models.user_model import UserModel

from services.ai_service import AIService   # 🔥 ADD

bp = Blueprint("medical_images", __name__, url_prefix="/api/medical-images")


@bp.route("/", methods=["POST"])
def upload_medical_image():

    print("[medical_images] Files:", list(request.files.keys()))

    if "file" not in request.files:
        return jsonify({"error": "file is required"}), 400

    file = request.files["file"]

    session = get_session()

    try:
        record_repo = MedicalRecordRepository(session)
        image_repo = MedicalImageRepository(session)

        ai_service = AIService(image_repo, record_repo)  # 🔥

        # ================= GET / CREATE PATIENT =================

        user = session.query(UserModel).first()

        if not user:
            return jsonify({"error": "No user found"}), 400

        patient = session.query(PatientModel).filter_by(user_id=user.id).first()

        if not patient:
            patient = PatientModel(
                user_id=user.id,
                full_name="Test Patient",
                phone="000000",
                date_of_birth=date(2000, 1, 1)
            )
            session.add(patient)
            session.commit()

        # ================= CREATE RECORD =================

        record = record_repo.create_record(
            patient_id=patient.id,
            notes="Retina uploaded"
        )

        # ================= SAVE FILE =================

        upload_dir = "uploads/retina"
        os.makedirs(upload_dir, exist_ok=True)

        ext = os.path.splitext(file.filename)[1]
        filename = f"{uuid.uuid4().hex}{ext}"
        path = os.path.join(upload_dir, filename)

        file.save(path)

        # ================= SAVE IMAGE =================

        image = image_repo.add_image(
            record_id=record.id,
            image_url=path
        )

        # ================= CALL AI 🔥 =================

        ai_service.analyze_image(image.id)

        return jsonify({
            "record_id": record.id,
            "image_id": image.id,
            "image_path": path,
            "status": "ai_done"
        })

    except Exception as e:
        session.rollback()
        print("Upload error:", str(e))
        return jsonify({"error": "Internal error"}), 500

    finally:
        session.close()