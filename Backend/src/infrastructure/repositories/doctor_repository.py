from infrastructure.models.doctor_model import DoctorModel


class DoctorRepository:

    def __init__(self, session):
        self.session = session

    def get_by_user_id(self, user_id: int):
        return (
            self.session
            .query(DoctorModel)
            .filter(DoctorModel.user_id == user_id)
            .first()
        )
