import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
     localStorage.setItem('loggedInUser', storedUser.name);
      alert(`Welcome back, ${storedUser.name}!`);
    } else {
      alert('Invalid credentials. Please sign up first.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Not registered?{" "}
          <Link to="/signup" style={{ color: '#ff4081', fontWeight: 'bold', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
