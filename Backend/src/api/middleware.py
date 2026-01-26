from flask import request, jsonify
from flask_cors import CORS

def middleware(app):
    # ✅ ENABLE CORS (FIX 100% LỖI)
    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:3000"}},
        supports_credentials=True
    )

    @app.before_request
    def before_request():
        # ⚠️ CHO OPTIONS ĐI QUA
        if request.method == "OPTIONS":
            return jsonify({"message": "OK"}), 200

    @app.after_request
    def after_request(response):
        response.headers["X-Custom-Header"] = "Value"
        return response
