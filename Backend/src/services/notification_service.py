from infrastructure.repositories.notification_repository import NotificationRepository


class NotificationService:
    def __init__(self, repo: NotificationRepository):
        self.repo = repo

    def notify(self, user_id: int, title: str, content: str):
        return self.repo.create(user_id, title, content)
