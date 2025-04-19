import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.active : ''}`} onClick={onClose} />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link} onClick={onClose}>
            Home
          </Link>
          <Link to="/resources" className={styles.link} onClick={onClose}>
            Resources
          </Link>
          <Link to="/instructors" className={styles.link} onClick={onClose}>
            Instructors
          </Link>
          <Link to="/about" className={styles.link} onClick={onClose}>
            About
          </Link>
          <Link to="/contact" className={styles.link} onClick={onClose}>
            Contact
          </Link>
        </nav>
        <div className={styles.auth}>
          <Link to="/login" className={styles.authLink} onClick={onClose}>
            Log In
          </Link>
          <Link to="/signup" className={`${styles.authLink} ${styles.signUp}`} onClick={onClose}>
            Sign Up
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 