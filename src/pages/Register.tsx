import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Register.module.css';

const Register: React.FC = () => {
  return (
    <div className={styles.register}>
      <div className={styles.registerCard}>
        <h1>Create Account</h1>
        <p className={styles.subtitle}>Join our community of families</p>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Create Account
          </button>

          <p className={styles.loginLink}>
            Already have an account?{' '}
            <Link to="/login" className={styles.link}>
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register; 