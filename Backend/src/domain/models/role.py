class Role:
    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name

    def is_admin(self) -> bool:
        return self.name == "admin"

    def is_doctor(self) -> bool:
        return self.name == "doctor"

    def is_patient(self) -> bool:
        return self.name == "patient"

    def is_clinic(self) -> bool:
        return self.name == "clinic"
