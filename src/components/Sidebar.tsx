import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink} onClick={onClose}>
          Home
        </Link>
        <Link to="/resources" className={styles.navLink} onClick={onClose}>
          Resources
        </Link>
        <Link to="/profile" className={styles.navLink} onClick={onClose}>
          Profile
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar; 