from infrastructure.repositories.audit_log_repository import AuditLogRepository


class AuditLogService:
    def __init__(self, repo: AuditLogRepository):
        self.repo = repo

    def log(self, action: str, description: str = ""):
        return self.repo.create(action, description)
