import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className={styles.logoText}>FamilyFund</span>
          </div>
        </Link>

        <div className={styles.navLinks}>
          <Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}>
            <span className={styles.navLinkText}>Home</span>
            {isActive('/') && <div className={styles.activeIndicator} />}
          </Link>
          <Link to="/resources" className={`${styles.navLink} ${isActive('/resources') ? styles.active : ''}`}>
            <span className={styles.navLinkText}>Resources</span>
            {isActive('/resources') && <div className={styles.activeIndicator} />}
          </Link>
          <Link to="/about" className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}>
            <span className={styles.navLinkText}>About</span>
            {isActive('/about') && <div className={styles.activeIndicator} />}
          </Link>
          <Link to="/contact" className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}>
            <span className={styles.navLinkText}>Contact</span>
            {isActive('/contact') && <div className={styles.activeIndicator} />}
          </Link>
        </div>

        <div className={styles.authButtons}>
          <button
            className={styles.loginButton}
            onClick={() => navigate('/login')}
          >
            Log In
          </button>
          <button
            className={styles.signupButton}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>

        <button
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 