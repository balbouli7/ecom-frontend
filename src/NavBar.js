import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from './components/AuthContext';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav
      style={{
        background: user
          ? 'linear-gradient(90deg, #1E1E2F, #2A2A40)' // Deep gradient for logged-in state
          : '#1E1E2F', // Solid dark color for logged-out state
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Hamburger Menu Icon */}
      <div>
        <FaBars
          style={{
            color: '#E0E0E0', // Light gray for the hamburger menu icon
            fontSize: '28px',
            cursor: 'pointer',
            transition: 'color 0.3s ease, transform 0.3s ease',
          }}
          onClick={() => setSidebarOpen(true)}
          onMouseOver={(e) => {
            e.target.style.color = '#FFFFFF';
            e.target.style.transform = 'rotate(90deg)';
          }}
          onMouseOut={(e) => {
            e.target.style.color = '#E0E0E0';
            e.target.style.transform = 'rotate(0deg)';
          }}
        />
      </div>

      {/* Logo Section */}
      <div>
        <Link
          to="/"
          style={{
            color: '#E0E0E0', // Light gray for logo
            fontSize: '28px',
            textDecoration: 'none',
            fontWeight: '700',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '1px',
            transition: 'color 0.3s ease, transform 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.target.style.color = '#FFFFFF';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.color = '#E0E0E0';
            e.target.style.transform = 'scale(1)';
          }}
        >
          MyApp
        </Link>
      </div>

      {/* User Profile / Cart Section */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {user ? (
          <>
            {/* Cart Icon */}
            <Link
              to="/cart"
              style={{
                color: '#E0E0E0', // Light gray for cart icon
                fontSize: '22px',
                textDecoration: 'none',
                transition: 'transform 0.3s, color 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.color = '#FFFFFF';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.color = '#E0E0E0';
              }}
            >
              <FaShoppingCart />
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                color: '#E0E0E0', // Light gray text
                fontSize: '16px',
                padding: '8px 20px',
                borderRadius: '25px',
                backgroundColor: 'transparent',
                border: '2px solid #E94560', // Elegant red border
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#E94560';
                e.target.style.color = '#FFFFFF';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#E0E0E0';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Login & Sign Up Buttons */}
            <Link
              to="/login"
              style={{
                color: '#E0E0E0', // Light gray text
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '8px 20px',
                borderRadius: '25px',
                backgroundColor: 'transparent',
                border: '2px solid #3498DB', // Blue border for login
                transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#3498DB';
                e.target.style.color = '#FFFFFF';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#E0E0E0';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                color: '#E0E0E0', // Light gray text
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '8px 20px',
                borderRadius: '25px',
                backgroundColor: 'transparent',
                border: '2px solid #9B59B6', // Purple border for Sign Up
                transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#9B59B6';
                e.target.style.color = '#FFFFFF';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#E0E0E0';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '250px',
            height: '100%',
            backgroundColor: '#2A2A40', // Dark blue for sidebar
            paddingTop: '60px',
            zIndex: 1001,
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Close Button inside Sidebar */}
          <FaTimes
            style={{
              color: '#E0E0E0', // Light gray for the close icon
              fontSize: '30px',
              position: 'absolute',
              top: '20px',
              right: '20px',
              cursor: 'pointer',
              transition: 'color 0.3s ease, transform 0.3s ease',
            }}
            onClick={() => setSidebarOpen(false)}
            onMouseOver={(e) => {
              e.target.style.color = '#FFFFFF';
              e.target.style.transform = 'rotate(90deg)';
            }}
            onMouseOut={(e) => {
              e.target.style.color = '#E0E0E0';
              e.target.style.transform = 'rotate(0deg)';
            }}
          />

 {/* Sidebar Links */}
{['Home', 'Products', 'Settings', 'Command']
  .concat(user?.role === 'admin' ? ['Users'] : []) // Only add "Users" if the logged-in user is an admin
  .map((item) => (
    <Link
      key={item}
      to={`/${item.toLowerCase()}`}
      style={{
        color: '#E0E0E0',
        textDecoration: 'none',
        fontSize: '18px',
        padding: '12px 20px',
        display: 'block',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
      onClick={() => setSidebarOpen(false)}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = '#3E3E5E';
        e.target.style.color = '#FFFFFF';
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = '#E0E0E0';
      }}
    >
      {item}
    </Link>
  ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;