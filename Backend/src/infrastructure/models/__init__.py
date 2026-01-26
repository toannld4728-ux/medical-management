# infrastructure/models/__init__.py
# IMPORT TẤT CẢ MODEL – TÊN PHẢI TRÙNG CLASS

from .user_model import UserModel
from .role_model import RoleModel

from .admin_model import AdminModel
from .doctor_model import DoctorModel
from .clinic_model import ClinicModel
from .patient_model import PatientModel

from .chat_room_model import ChatRoomModel
from .chat_message_model import ChatMessageModel

from .medical_record_model import MedicalRecordModel
from .medical_image_model import MedicalImageModel
from .diagnosis_model import DiagnosisModel
from .ai_diagnosis_model import AIDiagnosisModel

from .notification_model import NotificationModel
from .audit_log_model import AuditLogModel

from .todo_model import TodoModel
