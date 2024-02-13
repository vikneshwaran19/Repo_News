import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file for styling

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [userShortName, setUserShortName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        const dobParts = dob.split('-');
        const convertedDob = `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`;
          // Validation logic...
      if (!/^\D+$/.test(userName)) {
        throw new Error('User Name should not contain numeric characters.');
      }
      if (!/^[A-Za-z]{1,5}$/.test(userShortName)) {
        throw new Error('User Short Name must be alphabetic and 5 characters length or less.');
      }
      if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        throw new Error('Password must be at least 8 characters long and include alphabetic, numeric, and symbol characters.');
      }
      if (password !== confirmPassword) {
        throw new Error('Password and confirm password do not match.');
      }
      /*if (!/^([0-2]\d|3[0-1])-(0\d|1[0-2])-\d{4}$/.test(dob)) {
        throw new Error('Date of Birth must be in dd-mm-yyyy format.');
      }*/
      // Sign up logic...

      const response = await fetch('http://localhost:8080/api/signupuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_user_name: userName,  // Use 'username' for login_user_id
          login_password: password, // Use 'password' for login_password
          login_short_name: userShortName, // Use 'userShortName' for login_password
          login_dob: convertedDob, // Use 'dob' for login_password
          login_email: email, // Use 'email' for login_password
          login_mno: mobileNumber, // Use 'mobileNumber' for login_password
          login_address: address, // Use 'address' for login_password
        }),
      });
      console.log(response)
      if (response.ok) {
        console.log("Inside reponseLogin)")
    
        const data = await response.json();
        const { login_id } = data;
        
        // Display an alert with the login_id
        alert(`Login successful! Your login ID is: ${login_id}`);

      navigate('/');
      } else {
        console.log("Inside ELSE)")

        // If login fails, display an error message
        alert('Invalid signup');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
      <div className="signup-container">
      <h2 className="signup-header">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="signup-group">
          <label className="signup-label" htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            className="signup-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="signup-group">
          <label className="signup-label" htmlFor="userShortName">User Short Name:</label>
          <input
            type="text"
            id="userShortName"
            className="signup-input"
            value={userShortName}
            onChange={(e) => setUserShortName(e.target.value)}
            required
          />
        </div>
        <div className="signup-group">
          <label className="signup-label" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signup-group">
          <label className="signup-label" htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            className="signup-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="signup-group">
          <label className="signup-label" htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            className="signup-input"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="signup-group">
          <label className="signup-label" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="signup-group">
          <label className="signup-label" htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            className="signup-input"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            pattern="[0-9]{10}"
            title="Please enter a 10-digit phone number"
            required
          />
        </div>
        <div className="signup-group">
          <label className="signup-label" htmlFor="address">Address:</label>
          <textarea
            id="address"
            className="signup-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button" onClick={handleSignUp}>Sign Up</button>
      </form>
      </div>
  );
};

export default SignUp;
