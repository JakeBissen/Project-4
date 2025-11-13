import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login-page.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMsg('');

  try {
    const res = await axios.post('http://localhost:2000/api/login', {
      username,
      password,
    });

    if (res.data.message === 'Login successful') {
      localStorage.setItem('username', res.data.username);
      navigate('/dashboard');
    } else {
      setErrorMsg('Login failed. Please check your credentials.');
    }
  } catch (err: any) {
    setErrorMsg('Login failed. Please check your credentials.');
  }
};

  return (
    <div className="login-box">
      <h2>Login</h2>
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Username</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">Login</button>
        <p className="mt-3 text-center">
          <a href="/register">Need an account? Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;