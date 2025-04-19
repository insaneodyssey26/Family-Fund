import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Auth.module.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const { login, signInWithGoogle } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (authError) {
      setAuthError('');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setAuthError('');
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setAuthError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setAuthError('');
      await signInWithGoogle();
      navigate('/');
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in was cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        setAuthError('Popup was blocked by the browser. Please allow popups for this site.');
      } else {
        setAuthError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>💰</span>
            <span className={styles.logoText}>FamilyFund</span>
          </div>

          <div className={styles.formHeader}>
            <h1>Welcome Back</h1>
            <p>Sign in to continue managing your family's finances</p>
          </div>

          {authError && (
            <div className={styles.authError}>
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? styles.inputError : ''}
                  disabled={loading}
                />
              </div>
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={errors.password ? styles.inputError : ''}
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
            </div>

            <div className={styles.formOptions}>
              <label className={styles.rememberMe}>
                <input type="checkbox" disabled={loading} />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className={styles.forgotPassword}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <button
              type="button"
              className={styles.googleButton}
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </button>
          </form>

          <div className={styles.switchForm}>
            <p>
              Don't have an account?
              <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 