import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log("Inside Login)")
    e.preventDefault();
    try {
      console.log("Inside TRY)")

      const response = await fetch('http://localhost:8080/api/checkuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_email: username,  // Use 'username' for login_user_id
          login_password: password, // Use 'password' for login_password
        }),
      });
      console.log(response)
      if (response.ok) {
        console.log("Inside reponseLogin)")
    
        const data = await response.json();
        const { login_id } = data;
        
        // Display an alert with the login_id
        alert(`Login successful! Your login ID is: ${login_id}`);

        // Redirect to VehDet component and pass login_id as state
        navigate('/vehdet', { state: { loginId: login_id } });
        //navigate('/newspage');
      } else {
        console.log("Inside ELSE)")

        // If login fails, display an error message
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleSignup = () => {
    // Redirect to signup page
    navigate('/signup');
  };
  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group"><button type="submit" className="login-button" onClick={handleLogin}>Login</button>
        <span className="button-space"></span>
        <button type="submit" className="signup-button" onClick={handleSignup}>Signup</button>      
        </div>
        </form>
    </div>
  );
};

export default Login;
