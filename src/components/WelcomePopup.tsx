import React, { useEffect, useState } from 'react';
import styles from '../styles/WelcomePopup.module.css';

const WelcomePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setIsVisible(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.content}>
        <h2>Welcome to Family Fund!</h2>
        <p>Discover valuable resources for middle-class families.</p>
        <button className={styles.closeButton} onClick={() => setIsVisible(false)}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup; 