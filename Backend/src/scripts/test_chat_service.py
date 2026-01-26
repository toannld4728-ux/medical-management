import sys
import os
from flask import Flask

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
sys.path.append(BASE_DIR)

from infrastructure.databases.session import init_engine, get_session
from services.chat_service import ChatService


def create_test_app():
    app = Flask(__name__)
    app.config["DATABASE_URI"] = (
        "mssql+pymssql://sa:Aa%40123456@127.0.0.1:1433/FlaskApiDB"
    )
    return app


def test_chat_service():
    print("🚀 START CHAT SERVICE TEST")

    app = create_test_app()

    with app.app_context():
        # 🔥 QUAN TRỌNG
        init_engine()

        session = get_session()

        chat_service = ChatService(session)

        room = chat_service.create_room()
        print(f"✅ Room created: {room.id}")

        msg = chat_service.send_message(
            room_id=room.id,
            sender_id=1,
            content="Hello Chat Service"
        )
        print(f"✅ Message sent: {msg.content}")

        messages = chat_service.get_messages(room.id)
        print(f"📨 Messages count: {len(messages)}")

        session.close()

    print("🎉 TEST DONE")


if __name__ == "__main__":
    test_chat_service()
