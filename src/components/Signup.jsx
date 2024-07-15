import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { auth, createUserWithEmailAndPassword } from './firebase'; // Import correctly
import '../styles/signup.css'; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignupSuccess = (response) => {
    console.log('Signup Success:', response);
    navigate('/login'); // Navigate to the login page on success
  };

  const handleSignupFailure = (error) => {
    console.error('Signup Failure:', error);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login'); // Navigate to the login page on success
    } catch (error) {
      console.error('Error signing up with email and password:', error);
      alert('Error signing up with email and password: ' + error.message);
    }
  };

  return (
    <div className='signup-container'>
      <h2>Create your new account</h2>
      <p>Create an account to start looking for the food you like</p>
      <form className="signup-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder='Enter Email'
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            placeholder='User Name'
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder='Password'
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        < input type="checkbox"/>I Agree with <span>Terms of Service</span> and <span>Privacy Policy</span>
        <button type="submit" className="btn-submit">Register</button>
      </form>
      <p>----Or sign in with----</p>
      <GoogleLogin
        onSuccess={handleSignupSuccess}
        onError={handleSignupFailure}
      />
      <p>Have an account? <a href="/login">Sign In</a></p>
    </div>
  );
};

export default Signup;
