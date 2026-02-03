import os
from flask import Flask, send_from_directory
from flasgger import Swagger
from flask_cors import CORS

# ================= CONTROLLERS =================
from api.controllers.todo_controller import bp as todo_bp
from api.controllers.auth_controller import bp as auth_bp
from api.controllers.ai_controller import bp as ai_bp
from api.controllers.doctor_controller import bp as doctor_bp
from api.controllers.history_controller import bp as history_bp
from api.controllers.retina_controller import bp as retina_bp
from api.controllers.medical_image_controller import bp as medical_image_bp

# ================= CORE =================
from api.middleware import middleware
from config import Config
from api.swagger import template

# ================= DATABASE =================
from infrastructure.databases.session import engine
from infrastructure.databases.base import Base


# ================= PATH CONFIG =================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")


# ================= CREATE APP =================

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # ================= CORS =================
    CORS(app)

    # ================= SWAGGER =================
    Swagger(app, template=template)

    # ================= SERVE UPLOAD FILE =================
    @app.route("/uploads/<path:filename>")
    def serve_upload(filename):
        """
        Example:
        http://127.0.0.1:9999/uploads/retina/abc.png
        """
        return send_from_directory(UPLOAD_FOLDER, filename)

    # ================= REGISTER BLUEPRINTS =================
    app.register_blueprint(todo_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api")

    # AI / DOCTOR / HISTORY / RETINA đã có prefix trong blueprint
    app.register_blueprint(ai_bp)
    app.register_blueprint(doctor_bp)
    app.register_blueprint(history_bp)
    app.register_blueprint(retina_bp)
    app.register_blueprint(medical_image_bp)

    # ================= DATABASE =================
    Base.metadata.create_all(bind=engine)

    # ================= MIDDLEWARE =================
    middleware(app)

    return app


# ================= RUN =================

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=9999, debug=True)