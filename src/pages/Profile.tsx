import React from 'react';
import styles from '../styles/Profile.module.css';

const Profile: React.FC = () => {
  // Dummy data for bookmarked resources
  const bookmarkedResources = [
    {
      id: 1,
      title: 'Financial Planning Workshop',
      category: 'Finance',
    },
    {
      id: 2,
      title: 'College Savings Guide',
      category: 'Education',
    },
  ];

  return (
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          <span className={styles.avatarText}>JD</span>
        </div>
        <h1>John Doe</h1>
        <p className={styles.location}>New York, NY</p>
      </div>

      <section className={styles.section}>
        <h2>Bookmarked Resources</h2>
        <div className={styles.bookmarks}>
          {bookmarkedResources.map((resource) => (
            <div key={resource.id} className={styles.bookmarkCard}>
              <h3>{resource.title}</h3>
              <span className={styles.category}>{resource.category}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Account Settings</h2>
        <div className={styles.settings}>
          <div className={styles.settingItem}>
            <h3>Email</h3>
            <p>john.doe@example.com</p>
          </div>
          <div className={styles.settingItem}>
            <h3>Member Since</h3>
            <p>January 2024</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile; 