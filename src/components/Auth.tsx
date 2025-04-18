import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Auth.module.css';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.container}>
      {/* Left side - Form */}
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>💰</span>
            <span className={styles.logoText}>FamilyFund</span>
          </div>
          
          <div className={styles.formHeader}>
            <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p>{isLogin 
              ? 'Sign in to continue to FamilyFund' 
              : 'Join FamilyFund to get started'}</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {!isLogin && (
              <div className={styles.inputGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {isLogin && (
              <div className={styles.formOptions}>
                <label className={styles.rememberMe}>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className={styles.forgotPassword}>
                  Forgot password?
                </Link>
              </div>
            )}

            <button type="submit" className={styles.submitButton}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <button type="button" className={styles.googleButton}>
              <img src="/google-icon.svg" alt="Google" />
              Continue with Google
            </button>
          </form>

          <div className={styles.switchForm}>
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className={styles.illustrationSection}>
        <div className={styles.illustrationContent}>
          <h2>Your Family's Financial Future Starts Here</h2>
          <p>Join thousands of families who trust FamilyFund for their financial planning needs</p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📊</div>
              <div className={styles.featureText}>
                <h3>Smart Budgeting</h3>
                <p>Create and manage family budgets with ease</p>
              </div>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🎯</div>
              <div className={styles.featureText}>
                <h3>Goal Tracking</h3>
                <p>Set and achieve your family's financial goals</p>
              </div>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📱</div>
              <div className={styles.featureText}>
                <h3>Mobile Access</h3>
                <p>Manage your finances on the go</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth; 