from flask import Blueprint, request, jsonify
from infrastructure.databases.session import get_session
from infrastructure.repositories.chat_repository import ChatRepository
from services.chat_service import ChatService
from api.schemas.chat import ChatRoomSchema, MessageSchema

bp = Blueprint("chat", __name__, url_prefix="/api/chat")


@bp.route("/rooms", methods=["POST"])
def create_room():
    data = ChatRoomSchema().load(request.json)

    session = get_session()
    repo = ChatRepository(session)
    service = ChatService(repo)

    room = service.create_chat_room(data["patient_id"], data["doctor_id"])
    return jsonify({"room_id": room.id})


@bp.route("/rooms/<int:room_id>/messages", methods=["POST"])
def send_message(room_id):
    data = MessageSchema().load(request.json)

    session = get_session()
    repo = ChatRepository(session)
    service = ChatService(repo)

    msg = service.send_message(room_id, data["sender_id"], data["content"])
    return jsonify({"id": msg.id, "content": msg.content})
