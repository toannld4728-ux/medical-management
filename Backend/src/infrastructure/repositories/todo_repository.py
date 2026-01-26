from infrastructure.models.todo_model import TodoModel


class TodoRepository:
    def __init__(self, session):
        self.session = session

    def get_all(self):
        return self.session.query(TodoModel).all()
