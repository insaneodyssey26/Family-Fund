import React from 'react';
import styles from '../styles/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.backgroundAccent} />
      <div className={styles.contentWrapper}>
        <div className={styles.decorativeSidebar}>
          <div className={styles.sidebarContent}>
            <h3>Family Tips</h3>
            <p>"The family is the first essential cell of human society."</p>
            <p>"Family is not an important thing. It's everything."</p>
          </div>
        </div>
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 