import React, { useState, useEffect } from 'react';
import styles from '../styles/Contact.module.css';
import transition from '../styles/PageTransition.module.css';
import { contactService } from '../services/contactService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await contactService.sendMessage(formData);
      setSubmitStatus({
        type: 'success',
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${styles.container} ${transition.content}`}>
      <div className={`${styles.hero} ${transition.section}`}>
        <h1>Contact Us</h1>
        <p className={styles.subtitle}>We're here to help you with any questions or concerns</p>
      </div>

      <div className={styles.content}>
        <div className={`${styles.contactInfo} ${transition.section}`}>
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

        <div className={`${styles.contactForm} ${transition.section}`}>
          {submitStatus.type && (
            <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
              {submitStatus.message}
            </div>
          )}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 