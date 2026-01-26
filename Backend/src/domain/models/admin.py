class Admin:
    def __init__(self, id: int, user_id: int, permission_level: str):
        self.id = id
        self.user_id = user_id
        self.permission_level = permission_level

    def is_super_admin(self) -> bool:
        return self.permission_level == "full"
