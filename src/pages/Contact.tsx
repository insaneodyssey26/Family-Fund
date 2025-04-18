import React, { useState } from 'react';
import styles from '../styles/Contact.module.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      <div className={styles.hero}>
        <h1>Contact Us</h1>
        <p className={styles.subtitle}>We're here to help you with any questions or concerns</p>
      </div>

      <div className={styles.content}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <h3>Get in Touch</h3>
            <p>Have questions about FamilyFund? We'd love to hear from you.</p>
            
            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <span className={styles.icon}>📧</span>
                <div>
                  <h4>Email</h4>
                  <p>support@familyfund.com</p>
                </div>
              </div>
              
              <div className={styles.detailItem}>
                <span className={styles.icon}>📱</span>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className={styles.detailItem}>
                <span className={styles.icon}>📍</span>
                <div>
                  <h4>Address</h4>
                  <p>123 Financial Street, Suite 100<br />San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contactForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 