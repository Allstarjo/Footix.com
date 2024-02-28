# app/users/routes.py

from flask import jsonify, session
from app.users import users_bp
from app.auth.models import User
from app import db


