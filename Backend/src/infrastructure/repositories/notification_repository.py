from infrastructure.models.notification_model import NotificationModel


class NotificationRepository:
    def __init__(self, session):
        self.session = session

    def create(self, user_id, title, content):
        noti = NotificationModel(
            user_id=user_id,
            title=title,
            content=content
        )
        self.session.add(noti)
        self.session.commit()
        return noti

    def get_by_user(self, user_id):
        return (
            self.session.query(NotificationModel)
            .filter_by(user_id=user_id)
            .all()
        )
