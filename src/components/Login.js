import React, { useState } from 'react';
import authService from './authService';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    authService.login(username, password).then(
      () => {
        console.log("navigate");
        navigate('/');
      },
      error => {
        setError("Failed to login");
      }
    );
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <div className="input-container">
          <label>Username</label>
          <input
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            style={{marginTop:"10px"}}
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password   " // Adjusted placeholder length
            onChange={(e) => setPassword(e.target.value)}
            style={{marginTop:"10px"}}
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
