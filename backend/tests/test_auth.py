# tests/test_auth.py
import sys
import os

# Obtenez le chemin absolu du répertoire parent (le répertoire racine de votre projet)
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Ajoutez le répertoire parent (le répertoire racine de votre projet) au chemin de recherche des modules
sys.path.append(parent_dir)

import pytest
from app import app, db
from app.auth.models import User

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client

def test_login(client):
    # Enregistrez un utilisateur pour le test de connexion
    user = User(username='test4', email='test4@example.com', phone_number="0622599519", name="Jonayha")
    user.set_password('password')
    db.session.add(user)
    db.session.commit()

    response = client.post('/login', data={'username': 'test4', 'password': 'password'})
    assert response.status_code == 200
    # Vous pouvez ajouter des assertions supplémentaires pour vérifier le comportement attendu de la connexion

def test_register(client):
    response = client.post('/register', data={'username': 'test2', 'email': 'test2@example.com', 'password': 'password'})
    assert response.status_code == 200
    assert User.query.filter_by(username='test2').first() is not None