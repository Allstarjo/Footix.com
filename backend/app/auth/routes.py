# app/auth/routes.py

from flask import request, jsonify, session, current_app as app
from app.auth import auth_bp
from app import db
import jwt
from functools import wraps
from app.auth.models import User
from flask_jwt_extended import create_access_token

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    phone_number = data.get("phone_number")
    name = data.get("name")

    if not username or not email or not password or not name:
        return jsonify({'error': 'Missing fields'}), 400
    
    check_user = User.query.filter_by(username=username).first()
    check_email = User.query.filter_by(email=email).first()

    if check_user:
        return jsonify({'error': 'Username already exists'}), 409

    if check_email:
        return jsonify({'error': 'Email already registered'}), 409

    if not check_email and not check_user:
        user = User(username=username, email=email, name=name)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        # Create a JWT token for the newly registered user
        access_token = create_access_token(identity=user.id)
        
        return jsonify({'message': 'User registered successfully', 'access_token': access_token}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid username or password'}), 401

    # Supposons que vous ayez déjà l'objet `user` avec les informations de l'utilisateur
    additional_claims = {"username": user.username, "email": user.email, "name": user.name}

    # Créez le jeton d'accès avec des revendications supplémentaires
    access_token = create_access_token(identity=user.id, additional_claims=additional_claims)

    return jsonify({'access_token': access_token}), 200


# Fonction de vérification du token
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[1]

        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            print("Token payload:", data)  # Afficher le contenu du token pour le débogage
            # Assurez-vous que le champ 'user_id' est présent dans le token
            if 'user_id' not in data:
                return jsonify({'error': 'Token does not contain user ID'}), 401
            current_user = User.query.filter_by(id=data['user_id']).first()
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

@auth_bp.route('/api/some_route')
@token_required
def some_protected_route(user_id):
    return jsonify({'message': 'This is a protected route for user ID ' + str(user_id)}), 200


@auth_bp.route('/api/users/<username>')
def get_user_by_username(username):
    print("Username:", username)  # Imprime le username pour le débogage
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({
            'username': user.username,
            'email': user.email,
            # Autres données utilisateur
        }), 200
    else:
        return jsonify({'error': 'User not found'}), 404
    



