import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dasboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Questions from './questions';




const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Guest';
  const email = localStorage.getItem('email') || 'Not provided';

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [categoryStats, setCategoryStats] = useState<{ category: string; question_count: number }[]>([]);

  useEffect(() => {
    axios.get('http://localhost:2000/api/category-stats')
      .then(res => setCategoryStats(res.data))
      .catch(err => console.error('Error loading stats:', err));
  }, []);

  const handleLogout = () => {
      localStorage.clear();
  navigate('/login');

  };

  const fetchQuestions = async (category: string) => {
    try {
      const res = await axios.get(`http://localhost:2000/api/questions/${category}`);
      setQuestions(res.data);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setQuestions([]);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchQuestions(selectedCategory);
    }
  }, [selectedCategory]);

  const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};



  return (
    <div className="dashboard">
      <header className="bg-light text-center py-3 shadow-sm">
  <img
    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`}
    alt="avatar"
    className="rounded-circle mb-2"
    width="80"
  />
  <h2>{getGreeting()}, {username}!</h2>
  <p className="text-muted">{email}</p>
</header>
     <div className="main-layout d-flex">
  <aside className="sidebar p-3 border-end sidebar-fixed">
    <h5>Categories:</h5>
    <ul className="list-group">
      {categoryStats.map((cat, index) => (
        <li
          key={index}
          className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selectedCategory === cat.category ? 'active' : ''}`}
          onClick={() => setSelectedCategory(cat.category)}
        >
          {cat.category}
          <span className="badge bg-primary rounded-pill">{cat.question_count}</span>
        </li>
      ))}
    </ul>
  </aside>

  <section className="content p-4 flex-grow-1">
  <Questions questions={questions} selectedCategory={selectedCategory} />
</section>
</div>

      <div className="text-center my-4">
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;