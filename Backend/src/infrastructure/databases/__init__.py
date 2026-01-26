from infrastructure.databases.base import Base
from infrastructure.databases.session import engine


def init_db(app):
    """
    Import models & create tables
    """
    with app.app_context():
        # import models để đăng ký metadata
        from infrastructure.models.role_model import RoleModel
        from infrastructure.models.user_model import UserModel
        from infrastructure.models.admin_model import AdminModel
        from infrastructure.models.doctor_model import DoctorModel
        from infrastructure.models.patient_model import PatientModel
        from infrastructure.models.clinic_model import ClinicModel

        from infrastructure.models.medical_record_model import MedicalRecordModel
        from infrastructure.models.medical_image_model import MedicalImageModel
        from infrastructure.models.ai_diagnosis_model import AIDiagnosisModel
        from infrastructure.models.diagnosis_model import DiagnosisModel

        from infrastructure.models.chat_room_model import ChatRoomModel
        from infrastructure.models.chat_message_model import ChatMessageModel
        from infrastructure.models.notification_model import NotificationModel
        from infrastructure.models.audit_log_model import AuditLogModel
        from infrastructure.models.todo_model import TodoModel

        # tạo bảng
        Base.metadata.create_all(bind=engine)
