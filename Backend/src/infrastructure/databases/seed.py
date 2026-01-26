from app import create_app
from infrastructure.databases.session import init_engine, get_session
from infrastructure.models.role_model import RoleModel


def seed_roles():
    app = create_app()

    with app.app_context():
        init_engine()
        session = get_session()

        roles = ["admin", "doctor", "patient", "clinic"]

        for r in roles:
            exists = session.query(RoleModel).filter_by(name=r).first()
            if not exists:
                session.add(RoleModel(name=r))
                print("Added role:", r)
            else:
                print("Role exists:", r)

        session.commit()
        session.close()


if __name__ == "__main__":
    seed_roles()
