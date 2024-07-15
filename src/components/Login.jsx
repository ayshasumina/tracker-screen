import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from './firebase'; // Assuming your firebase.js file is in a 'firebase' folder

import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    console.log('Login Success:', user);
    navigate('/tracking'); // Navigate to tracking page on successful login
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failure:', error);
    alert('Error logging in with email and password: ' + error.message);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth,email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);
      handleLoginSuccess(user);
    } catch (error) {
      console.error('Error logging in with email and password:', error.code, error.message);
      alert('Error logging in with email and password: ' + error.message);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log('Google Login Success:', response);
    // Handle Google login success, you might want to integrate this with your app's logic
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google Login Failure:', error);
    alert('Error logging in with Google: ' + error.message);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Login to your account</h2>
        <p>Please sign in to your account</p>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit">Sign in</button>
        </form>
        <p>----Or sign in with----</p>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        />
        <p>Don't have an account? <a href="/signup">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
