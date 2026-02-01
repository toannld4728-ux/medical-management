from flask import Blueprint, request, jsonify
import os
import uuid
from datetime import date

from infrastructure.databases.session import get_session
from infrastructure.repositories.medical_record_repository import MedicalRecordRepository
from infrastructure.repositories.medical_image_repository import MedicalImageRepository

from infrastructure.models.patient_model import PatientModel
from infrastructure.models.user_model import UserModel

bp = Blueprint("medical_images", __name__, url_prefix="/api/medical-images")
@bp.route("/", methods=["POST"])
def upload_medical_image():
    """
    Upload medical image and save record/image in DB.

    consumes:
      - multipart/form-data
    parameters:
      - in: formData
        name: file
        type: file
        required: true
    """

    # Debug: log content type and incoming files/form for troubleshooting
    print("[medical_images] Content-Type:", request.content_type)
    print("[medical_images] Files keys:", list(request.files.keys()))
    print("[medical_images] Form keys:", request.form.to_dict())

    if "file" not in request.files:
        return jsonify({"error": "file is required"}), 400

    file = request.files["file"]

    # Accept either existing record_id or patient/doctor/notes to create a record
    record_id = request.form.get("record_id")
    patient_id = request.form.get("patient_id")
    doctor_id = request.form.get("doctor_id")
    notes = request.form.get("notes", "")

    session = get_session()
    try:
        record_repo = MedicalRecordRepository(session)
        image_repo = MedicalImageRepository(session)

        if record_id:
            record = record_repo.get_by_id(int(record_id))
            if not record:
                return jsonify({"error": "Record not found"}), 404
        else:
            # If patient_id not provided, fallback to first user -> patient (for testing)
            if not patient_id:
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

            # create medical record
            record = record_repo.create_record(
                patient_id=int(patient_id),
                notes=notes
            )

            # set doctor if provided
            if doctor_id:
                record.doctor_id = int(doctor_id)
                session.commit()

        # ================= SAVE FILE =================
        upload_dir = "uploads/retina"
        os.makedirs(upload_dir, exist_ok=True)

        ext = os.path.splitext(file.filename)[1]
        filename = f"{uuid.uuid4().hex}{ext}"
        path = os.path.join(upload_dir, filename)

        file.save(path)

        # ================= CREATE IMAGE RECORD =================
        image = image_repo.add_image(
            record_id=record.id,
            image_url=path
        )

        return jsonify({"id": image.id, "path": path, "record_id": record.id})
    except Exception as e:
        session.rollback()
        print("[medical_images] Error:", str(e))
        return jsonify({"error": "Internal server error"}), 500
    finally:
        session.close()

@bp.route("/<int:image_id>", methods=["GET"])
def get_medical_image(image_id):
    session = get_session()
    try:
        image_repo = MedicalImageRepository(session)
        image = image_repo.get_by_id(image_id)
        if not image:
            return jsonify({"error": "Image not found"}), 404
        return jsonify({"id": image.id, "image_url": image.image_url})
    except Exception as e:
        print("[medical_images] Error:", str(e))
        return jsonify({"error": "Internal server error"}), 500
    finally:
        session.close()