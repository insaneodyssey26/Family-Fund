import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Profile.module.css';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          {currentUser?.photoURL ? (
            <img src={currentUser.photoURL} alt="Profile" />
          ) : (
            <span>{currentUser?.displayName?.charAt(0) || '?'}</span>
          )}
        </div>
        <h1>{currentUser?.displayName || 'User'}</h1>
        <p>{currentUser?.email}</p>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.section}>
          <h2>Account Information</h2>
          <div className={styles.infoItem}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{currentUser?.email}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Account Created</span>
            <span className={styles.value}>
              {currentUser?.metadata.creationTime
                ? formatDate(currentUser.metadata.creationTime)
                : 'N/A'}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Last Sign In</span>
            <span className={styles.value}>
              {currentUser?.metadata.lastSignInTime
                ? formatDate(currentUser.metadata.lastSignInTime)
                : 'N/A'}
            </span>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Account Status</h2>
          <div className={styles.infoItem}>
            <span className={styles.label}>Email Verified</span>
            <span className={styles.value}>
              {currentUser?.emailVerified ? 'Yes' : 'No'}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Provider</span>
            <span className={styles.value}>
              {currentUser?.providerData[0]?.providerId === 'google.com'
                ? 'Google'
                : 'Email/Password'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 