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


#upload image endpoint
@bp.route("/<int:user_id>/images", methods=["GET"])
def list_user_images(user_id):
    session = get_session()
    repo = UserRepository(session)
    user = repo.get_by_id(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    images = [
        {
            "id": img.id,
            "image_url": img.image_url,
            "uploaded_at": img.uploaded_at.isoformat()
        }
        for img in user.images
    ]

    

    return jsonify(images)