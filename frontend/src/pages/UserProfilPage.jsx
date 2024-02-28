import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../css/UserProfile.css";

function UserPage() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        console.log(token)

        const response = await axios.get(`http://127.0.0.1:5000/api/users/${username}`,
        {headers: {
          Authorization: `Bearer ${token}` // Ajouter l'en-tête Authorization avec le token JWT
        }
      });
        setUserData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, [username]);

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!userData) {
    return <div>Chargement...</div>;
  }

  
  


  return (
  <div className='body'>
    <div className="header__wrapper">
      <header></header>
      <div className="cols__container">
        <div className="left__col">
          <div className="img__container">
            <img src={'/Users/jonathan/Documents/Footix.com/frontend/src/img/user.jpeg'} alt="Anna Smith" />
            <span></span>
          </div>
          <h2>{userData.username}</h2>
          <p>UX/UI Designer</p>
          <p>{userData.email}</p>

          <ul className="about">
            <li><span>4,073</span>Followers</li>
            <li><span>322</span>Following</li>
            <li><span>200,543</span>Attraction</li>
          </ul>

          <div className="content">
            <p>
              {userData.bio}
            </p>

            <ul>
              <li><i className="fab fa-twitter"></i></li>
              <i className="fab fa-pinterest"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-dribbble"></i>
            </ul>
          </div>
        </div>
        <div className="right__col">
          <nav>
            <ul>
              <li><a href="">posts</a></li>
              <li><a href="">rt</a></li>
              <li><a href="">saved</a></li>
              <li><a href="">likes</a></li>
            </ul>
            <button>Follow</button>
          </nav>

          <div className="photos">
            <img src="../img/img_1.avif" alt="Photo" />
            <img src="/Users/jonathan/Documents/Footix.com/frontend/src/img/img_2.avif" alt="Photo" />
            <img src="/Users/jonathan/Documents/Footix.com/frontend/src/img/img_3.avif" alt="Photo" />
            <img src="/Users/jonathan/Documents/Footix.com/frontend/src/img/img_4.avif" alt="Photo" />
            <img src="/Users/jonathan/Documents/Footix.com/frontend/src/img/img_5.avif" alt="Photo" />
            <img src="/Users/jonathan/Documents/Footix.com/frontend/src/img/img_6.avif" alt="Photo" />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default UserPage;
