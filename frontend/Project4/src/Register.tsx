
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Register.css'

const Register: React.FC = () => {}
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMsg, setErrorMsg] = useState('');
const navigate = useNavigate();

const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await axios.post('http://localhost:2000/api/register', {
        username,
        password,
        email,
      });

      if (response.status === 201) {
        navigate('/');
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg('Registration failed. Try again.');
      }
    };


    return (
        <div className='resister-container'>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input 
                    placeholder='Enter your Username'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                </div>

                <div>
                    <label>Email:</label>
                    <input 
                    placeholder='Enter your Email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>

                 <div>
          <label>Password:</label>
          <input
            placeholder='Enter your password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

            {errorMsg && <p className="error">{errorMsg}</p>}

            <button type='submit'>Register</button>
            </form>
            <p>
                <a href='/'>Back to Login</a>
            </p>
        </div>
    );
};



export default Register;
