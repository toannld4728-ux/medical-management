from pydantic import BaseModel


class NotificationRequest(BaseModel):
    user_id: int
    title: str
    content: str
