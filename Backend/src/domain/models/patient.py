from datetime import date


class Patient:
    def __init__(
        self,
        id: int,
        user_id: int,
        full_name: str,
        phone: str | None,
        date_of_birth: date | None,
    ):
        self.id = id
        self.user_id = user_id
        self.full_name = full_name
        self.phone = phone
        self.date_of_birth = date_of_birth
