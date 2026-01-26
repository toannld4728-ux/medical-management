from flask import Flask, jsonify
from flasgger import Swagger
from flask_swagger_ui import get_swaggerui_blueprint
import importlib


def _safe_import(name, attr=None, default=None):
    try:
        mod = importlib.import_module(name)
        return getattr(mod, attr) if attr else mod
    except Exception:
        return default


_DefaultConfig = type('_DefaultConfig', (), {'DEBUG': False})
Config = _safe_import('config', 'Config', _DefaultConfig)



def create_app():
    app = Flask(__name__)
    Swagger(app)

    # Safe imports to avoid unresolved module errors in copies of the project
    spec = _safe_import('api.swagger', 'spec', None)
    todo_bp = _safe_import('api.controllers.todo_controller', 'bp', None)
    middleware_fn = _safe_import('api.middleware', 'middleware', lambda app: None)
    init_db = _safe_import('infrastructure.databases', 'init_db', lambda app: None)

    # Đăng ký blueprint nếu có
    if todo_bp:
        app.register_blueprint(todo_bp)

    # Thêm Swagger UI blueprint
    SWAGGER_URL = '/docs'
    API_URL = '/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={'app_name': "Todo API"}
    )
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    try:
        init_db(app)
    except Exception as e:
        print(f"Error initializing database: {e}")

    # Register middleware
    middleware_fn(app)

    # Register routes
    with app.test_request_context():
        for rule in app.url_map.iter_rules():
            # Thêm các endpoint khác nếu cần
            if rule.endpoint.startswith(('todo.', 'course.', 'user.')):
                view_func = app.view_functions[rule.endpoint]
                print(f"Adding path: {rule.rule} -> {view_func}")
                spec.path(view=view_func)

    @app.route("/swagger.json")
    def swagger_json():
        return jsonify(spec.to_dict())

    return app
# Run the application

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=9999, debug=True)