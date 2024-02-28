import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserProfilPage';
import ProtectedComponent from './pages/test';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/signup' element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/users/:username" element={<UserPage/>} />
          <Route path="/procteted" element={<ProtectedComponent/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
