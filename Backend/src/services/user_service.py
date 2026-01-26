from infrastructure.repositories.user_repository import UserRepository
from infrastructure.repositories.audit_log_repository import AuditLogRepository


class AuthService:
    def __init__(self, user_repo: UserRepository, audit_repo: AuditLogRepository):
        self.user_repo = user_repo
        self.audit_repo = audit_repo

    def register(self, email: str, password: str, role_name: str):
        existing = self.user_repo.get_by_email(email)
        if existing:
            return None

        user = self.user_repo.create_user(email, password, role_name)

        self.audit_repo.create(
            action="REGISTER",
            description=f"{email} registered"
        )
        return user

    def login(self, email: str, password: str):
        user = self.user_repo.get_by_email(email)
        if not user or user.password_hash != password:
            return None

        self.audit_repo.create(
            action="LOGIN",
            description=f"{email} logged in"
        )
        return user
