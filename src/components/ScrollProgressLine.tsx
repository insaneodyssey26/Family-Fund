import React, { useEffect, useState } from 'react';
import styles from './ScrollProgressLine.module.css';

const ScrollProgressLine: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);

        // Initial calculation
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.progressContainer}>
            <div
                className={styles.progressBar}
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
};

export default ScrollProgressLine; 