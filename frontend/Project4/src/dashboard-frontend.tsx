import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './dasboard.css';


const categories = ['JavaScript', 'React', 'Vue', 'CSS', 'HTML'];

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = (location.state as any)?.username || 'Guest';

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  const handleLogout = () => {
    navigate('/');
  };

  const fetchQuestions = async (category: string) => {
    try {
      const response = await axios.get(`http://localhost:2000/api/questions/${category}`);
      setQuestions(response.data);
    } catch (error){
      console.error('error fetching questions', error);
      setQuestions([]);
    }
  };

  useEffect(() => {
    if (selectedCategory){
      fetchQuestions(selectedCategory)
    }
  },[selectedCategory]);

  return (
    <div className="dashboard">
      <header>
        <h1>App Title</h1>
        
      </header>

      <div className='main-layout'>
        <aside className='sidebar'>
          {categories.map((math, index) =>
          <div key={index} className='category'> {math}
          </div>)}
        </aside>

          <section className="content">
          {!selectedCategory ? (
            <p>Select a Category to view its questions.</p>
          ) : questions.length === 0 ? (
            <p>No questions found for {selectedCategory}.</p>
          ) : (
            <ul>
              {questions.map((q) => (
                <li key={q.id}>
                  <strong>{q.title}</strong>
                  <p>{q.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <button onClick={() => {
  localStorage.removeItem('token');
  navigate('/login');
}}>Logout</button>
    </div>
  );
};

export default Dashboard;