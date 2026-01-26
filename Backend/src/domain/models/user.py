from domain.models.role import Role


class User:
    def __init__(
        self,
        id: int,
        email: str,
        role: Role,
    ):
        self.id = id
        self.email = email
        self.role = role

    def can_login(self) -> bool:
        return self.role is not None

    def is_admin(self) -> bool:
        return self.role.is_admin()

    def is_doctor(self) -> bool:
        return self.role.is_doctor()

    def is_patient(self) -> bool:
        return self.role.is_patient()

    def is_clinic(self) -> bool:
        return self.role.is_clinic()
