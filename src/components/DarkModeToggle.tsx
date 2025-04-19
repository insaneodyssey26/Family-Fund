import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from '../styles/DarkModeToggle.module.css';

const DarkModeToggle: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <button
            className={`${styles.toggleButton} ${isDarkMode ? styles.dark : styles.light}`}
            onClick={toggleDarkMode}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
            <div className={styles.toggleIcon}>
                {isDarkMode ? '🌙' : '☀️'}
            </div>
        </button>
    );
};

export default DarkModeToggle; 