import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'a_default_secret_key')
    DEBUG = True
    TESTING = False

    # 🔥 SQL SERVER 2022 — CHUẨN, ĐÃ FIX SSL + LOGIN
    DATABASE_URI = (
        "mssql+pyodbc://sa:Aa%40123456@127.0.0.1:1433/FlaskApiDB"
        "?driver=ODBC+Driver+18+for+SQL+Server"
        "&Encrypt=yes"
        "&TrustServerCertificate=yes"
    )

    CORS_HEADERS = 'Content-Type'


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True


class ProductionConfig(Config):
    DEBUG = False
