import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email });
      onLogin(email);
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
