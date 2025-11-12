import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './dasboard.css';


const categories = ['Category1', 'Category2', 'Category3', 'Category4', 'Category5'];


const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = (location.state as any)?.username || 'Guest';

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard">
      <header>
        <h1>App Title</h1>
        <div>
          <span>Welcome, {username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className='main-layout'>
        <aside className='sidebar'>
          {categories.map((math, index) =>
          <div key={index} className='category'> {math}
          </div>)}
        </aside>

          <section className='content'>
            <p>Select a Category to view its questions</p>
            </section>
      </div>
    </div>
  );
};

export default Dashboard;