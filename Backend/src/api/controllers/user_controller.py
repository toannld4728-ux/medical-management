from flask import Blueprint, jsonify
from infrastructure.databases.session import get_session
from infrastructure.repositories.user_repository import UserRepository

bp = Blueprint("user", __name__, url_prefix="/api/users")


@bp.route("/", methods=["GET"])
def list_users():
    session = get_session()
    repo = UserRepository(session)
    users = repo.get_all()

    return jsonify([
        {"id": u.id, "email": u.email, "role_id": u.role_id}
        for u in users
    ])
