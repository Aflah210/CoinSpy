import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      {user ? (
        <>
          <Link to="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
          {user.email && <span style={{ marginRight: '1rem' }}>Logged in as: {user.email}</span>}
          <button onClick={handleLogout} style={{ marginRight: '1rem' }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar; 