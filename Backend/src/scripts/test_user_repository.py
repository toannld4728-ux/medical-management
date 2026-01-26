import sys
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
sys.path.append(BASE_DIR)

from app import create_app
from infrastructure.databases.session import get_session
from infrastructure.repositories.user_repository import UserRepository


def main():
    app = create_app()

    with app.app_context():
        session = get_session()
        repo = UserRepository(session)

        user = repo.create_user(
            email="doctor_test_01@gmail.com",
            password_hash="123456",
            role_name="doctor"
        )

        print("✅ Created user:")
        print("ID:", user.id)
        print("Email:", user.email)
        print("Role:", user.role.name)


if __name__ == "__main__":
    main()
