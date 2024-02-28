// LoginForm.js
import React, { useState } from 'react';
import "../css/LoginPage.css";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { username, password };

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:');

        const token = data.access_token; // Remplacez "votre_token_jwt" par votre jeton JWT
        const decodedPayload = jwtDecode(token);
        const username = decodedPayload.username;
        // Décoder le token JWT pour obtenir la partie payloa

        // Après une connexion réussie, stockez le token dans le stockage local
        localStorage.setItem('token', token);

        navigate(`/users/${username}`)
        // Gérer la connexion réussie (par exemple, rediriger l'utilisateur)
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        // Afficher un message d'erreur à l'utilisateur
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      // Gérer les erreurs de connexion
    }
  };






// Appel de la fonction pour récupérer les informations de l'utilisateur
 // Affiche les informations de l'utilisateur dans la console


  return (
    <div id='body'>
      <div id="SignupContainer">
        <div className="signupBox">
          <header>
            <h2>Footix</h2>
            <p>Sign up to see photos and videos from your friends.</p>
            <button><i className="fab fa-facebook"></i>Log in with Facebook</button>
          </header>
          <div className="seperator">
            <hr />OR<hr />
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text"  placeholder="Username" value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign in</button>
          </form>
        </div>
      </div>
      <div id="BottomContainer">
        <p>
          Dont have a account? <a href="/signup">Sign Up</a>
        </p>
      </div>
      <div id="AppsContainer">
        <p>Get the app.</p>
        <img src="https://i.postimg.cc/Vkm7D9Xd/appstore.png" alt="appstore" />
        <img src="https://i.postimg.cc/R00gzMsm/playstore.png" alt="playstore" />
      </div>
      <div id="LastContainer">
        <div className="links">
          <a href="#">ABOUT</a>
          <a href="#">HELP</a>
          <a href="#">PRESS</a>
          <a href="#">API</a>
          <a href="#">JOBS</a>
          <a href="#">PRIVACY</a>
          <a href="#">TERMS</a>
          <a href="#">LOCATIONS</a>
          <a href="#">TOP ACCOUNTS</a>
          <a href="#">HASH TAGS</a>
          <a href="#">LANGUAGE</a>
        </div>
        <div className="copyright">
          <p>&copy; 2020 INSTAGRAM SIGN UP PAGE CLONE</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
