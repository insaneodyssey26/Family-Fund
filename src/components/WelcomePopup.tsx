import React, { useState, useEffect } from 'react';
import styles from '../styles/WelcomePopup.module.css';

const WelcomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        <div className={styles.content}>
          <h2>Welcome to FamilyFund!</h2>
          <p>
            Your journey to better family financial planning starts here. Explore our
            resources, connect with experts, and take control of your family's
            financial future.
          </p>
          <button className={styles.getStartedButton} onClick={handleClose}>
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default WelcomePopup; 