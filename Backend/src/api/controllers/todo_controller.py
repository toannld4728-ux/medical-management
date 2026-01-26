from flask import Blueprint, request, jsonify
from infrastructure.databases.session import get_session
from infrastructure.models.todo_model import TodoModel

bp = Blueprint("todo", __name__, url_prefix="/todos")

print("✅ TODO CONTROLLER LOADED")


@bp.route("/", methods=["GET"])
def list_todos():
    """
    Get all todos
    ---
    tags:
      - Todo
    summary: Get list of todos
    responses:
      200:
        description: List of todos
    """
    session = get_session()
    try:
        todos = session.query(TodoModel).all()
        return jsonify([t.to_dict() for t in todos])
    finally:
        session.close()


@bp.route("/", methods=["POST"])
def create_todo():
    """
    Create a todo
    ---
    tags:
      - Todo
    summary: Create new todo
    consumes:
      - application/json
    parameters:
      - in: body
        name: body
        schema:
          type: object
          required:
            - title
          properties:
            title:
              type: string
              example: Learn Flask
    responses:
      201:
        description: Todo created
    """
    data = request.json
    session = get_session()
    try:
        todo = TodoModel(title=data["title"])
        session.add(todo)
        session.commit()
        session.refresh(todo)
        return jsonify(todo.to_dict()), 201
    finally:
        session.close()
