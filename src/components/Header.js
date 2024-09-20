// src/components/Header.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
      navigate('/login');
  };

  // Add these styles in the same file above or in a separate CSS file

const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: '10px 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    nav: {
      display: 'flex',
    },
    link: {
      marginRight: '20px',
      cursor: 'pointer',
      fontWeight: 'bold',
      color: '#333',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
    },
    logout: {
      marginRight: '20px',
      cursor: 'pointer',
      color: '#333',
    },
    profileIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#6c757d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
    }
  };
  

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <span style={styles.link} onClick={() => navigate('/')}>My WorkBoards</span>
      </nav>
      <div style={styles.rightSection}>
        <span style={styles.logout} onClick={handleLogout}>Logout</span>
        <div style={styles.profileIcon}>N</div>
      </div>
    </header>
  );
};

export default Header;
