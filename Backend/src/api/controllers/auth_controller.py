from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from infrastructure.databases.session import get_session
from infrastructure.models.user_model import UserModel
from infrastructure.models.role_model import RoleModel
from infrastructure.models.doctor_model import DoctorModel

bp = Blueprint("auth", __name__, url_prefix="/api")

print("✅ AUTH CONTROLLER LOADED")


# ================= ROLE DETECTION =================
def detect_role_name(email: str) -> str:
    if email.endswith("@admin.com"):
        return "admin"
    if email.endswith("@doctor.com"):
        return "doctor"
    if email.endswith("@clinic.com"):
        return "clinic"
    return "user"


# ================= REGISTER =================
@bp.route("/register", methods=["POST"])
def register():
    """
    Register new user
    ---
    tags:
      - Auth
    consumes:
      - application/json
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - full_name
            - email
            - phone
            - password
            - confirm_password
          properties:
            full_name:
              type: string
              example: Dr Strange
            email:
              type: string
              example: doctor@doctor.com
            phone:
              type: string
              example: 0989999999
            password:
              type: string
              example: 123456
            confirm_password:
              type: string
              example: 123456
    responses:
      201:
        description: Registered successfully
      400:
        description: Validation error
    """

    data = request.get_json() or {}
    session: Session = get_session()

    try:
        # ===== VALIDATE =====
        required_fields = [
            "full_name",
            "email",
            "phone",
            "password",
            "confirm_password",
        ]

        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing field: {field}"}), 400

        if data["password"] != data["confirm_password"]:
            return jsonify({"error": "Password confirmation does not match"}), 400

        # ===== ROLE =====
        role_name = detect_role_name(data["email"])

        role = session.query(RoleModel).filter_by(name=role_name).first()
        if not role:
            return jsonify({"error": "Role not found"}), 500

        # ===== CREATE USER =====
        user = UserModel(
            full_name=data["full_name"],
            email=data["email"],
            phone=data["phone"],
            password_hash=data["password"],  # demo chưa hash
            role_id=role.id,
        )

        session.add(user)
        session.flush()  # <<< lấy user.id ngay

        # ===== CREATE DOCTOR IF ROLE = doctor =====
        if role.name == "doctor":
            doctor = DoctorModel(
                user_id=user.id,
                specialization="General",
            )
            session.add(doctor)

        session.commit()

        return jsonify(
            {
                "message": "Registered successfully",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "role": role.name,
                },
            }
        ), 201

    except IntegrityError:
        session.rollback()
        return jsonify({"error": "Email already exists"}), 400

    except Exception as e:
        session.rollback()
        print("REGISTER ERROR:", e)
        return jsonify({"error": "Internal server error"}), 500

    finally:
        session.close()


# ================= LOGIN =================
@bp.route("/login", methods=["POST"])
def login():
    """
    Login
    ---
    tags:
      - Auth
    consumes:
      - application/json
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - email
            - password
          properties:
            email:
              type: string
              example: doctor@doctor.com
            password:
              type: string
              example: 123456
    responses:
      200:
        description: Login success
      401:
        description: Invalid credentials
    """

    data = request.get_json() or {}
    session: Session = get_session()

    try:
        if not data.get("email") or not data.get("password"):
            return jsonify({"error": "Missing email or password"}), 400

        user = session.query(UserModel).filter_by(email=data["email"]).first()

        if not user:
            return jsonify({"error": "User not found"}), 401

        if user.password_hash != data["password"]:
            return jsonify({"error": "Invalid credentials"}), 401

        return jsonify(
            {
                "message": "Login success",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "role": user.role.name,
                },
            }
        ), 200

    finally:
        session.close()
