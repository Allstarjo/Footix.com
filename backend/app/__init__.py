# app/__init__.py

from flask import Flask, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_session import Session
from flask_jwt_extended import JWTManager
from datetime import timedelta


# Créer une instance de l'application Flask
app = Flask(__name__)



# Configurer l'application Flask
app.config['SECRET_KEY'] = 'api'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SESSION_TYPE'] = 'filesystem'  # Choisissez le type de stockage de session (filesystem, redis, etc.)
app.config['SESSION_COOKIE_SECURE'] = True  # Assurez-vous que les cookies sont sécurisés (HTTPS)
app.config['SESSION_COOKIE_HTTPONLY'] = True  # Empêchez l'accès aux cookies depuis JavaScript
app.config['SESSION_COOKIE_SAMESITE'] = 'Strict'  # Renforcez les politiques de SameSite
app.config['SESSION_PERMANENT'] = True
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Changez ceci par votre propre clé secrète
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  # Désactiver l'expiration du token d'accès
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(minutes=2)  # Durée de vie du token de rafraîchissement: 2 heures d'inactivité
jwt = JWTManager(app)
Session(app)
CORS(app)

# Initialiser l'extension SQLAlchemy
db = SQLAlchemy(app)
migrate = Migrate(app, db)


# Importer les routes de l'application
from app.auth import auth_bp
app.register_blueprint(auth_bp)

