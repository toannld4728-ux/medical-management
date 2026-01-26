from datetime import datetime


class Notification:
    def __init__(
        self,
        id: int,
        user_id: int,
        title: str,
        content: str,
        is_read: bool,
        created_at: datetime,
    ):
        self.id = id
        self.user_id = user_id
        self.title = title
        self.content = content
        self.is_read = is_read
        self.created_at = created_at
