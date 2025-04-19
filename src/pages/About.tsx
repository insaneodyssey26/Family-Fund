import React, { useEffect } from 'react';
import styles from '../styles/About.module.css';
import transition from '../styles/PageTransition.module.css';

const About: React.FC = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`${styles.container} ${transition.content}`}>
      <div className={`${styles.hero} ${transition.section}`}>
        <h1>About FamilyFund</h1>
        <p className={styles.subtitle}>Empowering families to achieve financial freedom together</p>
      </div>

      <div className={styles.content}>
        <section className={`${styles.section} ${transition.section}`}>
          <h2>Our Mission</h2>
          <p>
            FamilyFund was created with a simple mission: to help families manage their finances
            more effectively and achieve their financial goals together. We believe that financial
            well-being starts at home, and we're here to make that journey easier.
          </p>
        </section>

        <section className={`${styles.statsSection} ${transition.section}`}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>10K+</span>
              <p className={styles.statLabel}>Families Helped</p>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>95%</span>
              <p className={styles.statLabel}>Success Rate</p>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>24/7</span>
              <p className={styles.statLabel}>Support</p>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>50+</span>
              <p className={styles.statLabel}>Expert Advisors</p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.valuesSection} ${transition.section}`}>
          <h2>Our Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3>Trust</h3>
              <p>Building lasting relationships through transparency and reliability</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💡</div>
              <h3>Innovation</h3>
              <p>Continuously improving our services to meet evolving family needs</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🎯</div>
              <h3>Excellence</h3>
              <p>Delivering the highest quality financial guidance and support</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>❤️</div>
              <h3>Family First</h3>
              <p>Putting families at the heart of everything we do</p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.teamSection} ${transition.section}`}>
          <h2>Our Commitment</h2>
          <div className={styles.teamContent}>
            <p>
              At FamilyFund, we're committed to providing the tools, resources, and support
              that families need to build a secure financial future. Our team of experts works
              tirelessly to ensure that every family has access to the best financial planning
              resources and guidance.
            </p>
            <button className={styles.ctaButton}>Join Our Community</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 