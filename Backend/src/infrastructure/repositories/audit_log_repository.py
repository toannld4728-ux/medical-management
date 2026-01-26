from infrastructure.models.audit_log_model import AuditLogModel


class AuditLogRepository:
    def __init__(self, session):
        self.session = session

    def create(self, audit_log: AuditLogModel):

        self.session.add(audit_log)
        self.session.commit()
        return audit_log

    def get_all(self):

        return self.session.query(AuditLogModel).all()

    def get_by_id(self, audit_log_id: int):

        return (
            self.session.query(AuditLogModel)
            .filter(AuditLogModel.id == audit_log_id)
            .first()
        )

    def get_by_action(self, action: str):

        return (
            self.session.query(AuditLogModel)
            .filter(AuditLogModel.action == action)
            .all()
        )

    def get_by_user(self, user_id: int):

        return (
            self.session.query(AuditLogModel)
            .filter(AuditLogModel.performed_by == user_id)
            .all()
        )
