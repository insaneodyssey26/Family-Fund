import React from 'react';
import styles from '../styles/About.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>About FamilyFund</h1>
        <p className={styles.subtitle}>Empowering families to achieve financial freedom together</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Our Mission</h2>
          <p>
            FamilyFund was created with a simple mission: to help families manage their finances
            more effectively and achieve their financial goals together. We believe that financial
            well-being starts at home, and we're here to make that journey easier.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What We Offer</h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>Family Budgeting</h3>
              <p>
                Create and manage shared budgets that everyone in the family can access and
                contribute to. Track expenses, set limits, and work together towards common goals.
              </p>
            </div>
            <div className={styles.feature}>
              <h3>Goal Tracking</h3>
              <p>
                Set financial goals as a family and track your progress. Whether it's saving for
                a vacation, education, or a new home, we help you stay on track.
              </p>
            </div>
            <div className={styles.feature}>
              <h3>Financial Education</h3>
              <p>
                Access resources and tools to improve your family's financial literacy. Learn
                together and make informed decisions about your money.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Our Story</h2>
          <p>
            FamilyFund was founded in 2024 by a team of financial experts and family-oriented
            developers who saw a need for better family financial management tools. We understand
            that managing family finances can be challenging, and we're here to make it simpler
            and more effective.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Join Our Community</h2>
          <p>
            Become part of a growing community of families who are taking control of their
            financial future. Sign up today and start your journey towards better financial
            management and stronger family bonds.
          </p>
          <button className={styles.ctaButton}>Get Started</button>
        </section>
      </div>
    </div>
  );
};

export default About; 