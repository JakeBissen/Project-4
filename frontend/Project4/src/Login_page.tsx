import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await axios.post('http://localhost:2000/api/login', {
        username,
        password,
      });

      if (response.data.message === 'Login successful') {
        navigate('/dashboard', { state: { username: response.data.username } });
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrorMsg('Invalid username or password');
      } else {
        setErrorMsg('Server error. Please try again later.');
      }
    }
  };
return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <button type="submit">Login</button>
        <p>
          <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );

}


export default Login;