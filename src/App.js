// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import NewsPage from './components/NewsPage';
import SignUp from './components/SignUp';
import VehDet from './components/VehDet';
import Logo from './logo1.png'; // Import your logo image
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="logo-container">
            <img src={Logo} alt="Logo" className="logo" />
            <h1 className="heading">Vehi Quick Management Portal</h1>
          </div>
          <nav className="navbar">
            <Link to="/vehdet" className="nav-link">Configure Vehicles Info</Link>
            <Link to="/repdet" className="nav-link">Remainder</Link>
            <Link to="/newspage" className="nav-link">News Splash</Link>
            <Link to="/signout" className="nav-link">SignOut</Link>
          </nav>
        </header>
        <main className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/vehdet" element={<VehDet />} />
            <Route path="/newspage" element={<NewsPage />} />
            <Route path="/signout" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
