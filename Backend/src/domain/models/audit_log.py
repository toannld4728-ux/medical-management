from datetime import datetime


class AuditLog:
    def __init__(
        self,
        id: int,
        action: str,
        description: str | None,
        created_at: datetime,
    ):
        self.id = id
        self.action = action
        self.description = description
        self.created_at = created_at
