import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dasboard.css';

const categories = ['JavaScript', 'React', 'Vue', 'CSS', 'HTML'];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Guest';

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
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

  return (
    <div className="dashboard">
      <header className="bg-light text-center py-3 shadow-sm">
        <h2>Welcome, {username}!</h2>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <h5>Select a Category:</h5>
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`category ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </aside>

        <section className="content">
          {!selectedCategory ? (
            <p className="text-muted">Choose a category to view questions.</p>
          ) : questions.length === 0 ? (
            <p>No questions found for <strong>{selectedCategory}</strong>.</p>
          ) : (
            <ul className="list-group">
              {questions.map((q) => (
                <li key={q.id} className="list-group-item">
                  <strong>{q.title}</strong>
                  <p>{q.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="text-center my-4">
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;