import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/SignupPage.css";

function SignupPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Créer un objet contenant les données du formulaire
    const formData = {
      name: name,
      email: email,
      username: username,
      password: password
    };
  
    try {
      // Envoyer les données au backend via une requête POST
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      // Vérifier si la requête a réussi (statut HTTP 200)
      if (response.ok) {
        // Afficher un message de succès ou rediriger l'utilisateur
        navigate('/login');
        console.log('Signup successful!');
      } else {
        // Gérer les erreurs de requête
        console.error('Signup failed:', await response.json());
      }
    } catch (error) {
      // Gérer les erreurs de connexion au backend
      console.error('Error connecting to backend:', error);
    }
  };

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
            <input type="email"  placeholder="Mobile Number or Email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <input type="text"  placeholder="Full Name" value={name}
              onChange={(e) => setName(e.target.value)} />
            <input type="text"  placeholder="Username" value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign up</button>
          </form>
          <footer>
            <p>
              By signing up, you agree to our <a href="#">Terms , Data Policy</a> and <a href="#">Cookies Policy</a> .
            </p>
          </footer>
        </div>
      </div>
      <div id="BottomContainer">
        <p>
          Have an account? <a href="/login">Log in</a>
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
}

export default SignupPage;
