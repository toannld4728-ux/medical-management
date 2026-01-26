from infrastructure.repositories.todo_repository import TodoRepository


class TodoService:
    def __init__(self, todo_repo: TodoRepository):
        self.todo_repo = todo_repo

    def get_all(self):
        return self.todo_repo.get_all()

    def get_by_id(self, todo_id: int):
        return self.todo_repo.get_by_id(todo_id)

    def create(self, title: str, description: str = None):
        return self.todo_repo.create(
            title=title,
            description=description,
            status="pending"   # ✅ FIX CHÍNH
        )

    def update(self, todo_id: int, title: str, description: str, status: str):
        return self.todo_repo.update(todo_id, title, description, status)

    def delete(self, todo_id: int):
        return self.todo_repo.delete(todo_id)
