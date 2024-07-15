import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { auth } from './components/firebase';
import Login from './components/Login';
import Signup from './components/Signup';
import Tracking from './components/Tracking';


const clientId = 'YOUR_GOOGLE_OAUTH_CLIENT_ID'; // Replace with your actual client ID

const App = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>

          {/* Route for Login */}
          <Route path="/login" element={<Login />} />

          {/* Route for Signup */}
          <Route path="/signup" element={<Signup />} />

          {/* Route for Tracking */}
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/" element={<Login />} />
          
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
