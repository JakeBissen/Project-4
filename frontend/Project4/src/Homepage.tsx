import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to the Forum App</h1>
      <p>Select a section to begin:</p>
      <div className="nav-buttons">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      </div>
    </div>
  );
};

export default Home;