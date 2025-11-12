import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = (location.state as any)?.username || 'Guest';

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard">
      <h1>App Title</h1>
      <p>Welcome, {username}</p>
      <button onClick={handleLogout}>Logout</button>
      {/* Add category sidebar and question viewer here */}
    </div>
  );
};

export default Dashboard;