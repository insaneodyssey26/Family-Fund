import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeaturedResources from '../components/FeaturedResources';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to FamilyFund</h1>
          <p className={styles.heroSubtitle}>
            Your trusted resource for family financial planning and support
          </p>
          <div className={styles.heroActions}>
            <button
              className={styles.ctaButton}
              onClick={() => navigate('/resources')}
            >
              Browse Resources
            </button>
            <div className={styles.quickLinks}>
              <button
                className={styles.quickLink}
                onClick={() => scrollToSection('features')}
              >
                View Features
              </button>
              <button
                className={styles.quickLink}
                onClick={() => scrollToSection('testimonials')}
              >
                Success Stories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources Section */}
      <FeaturedResources />

      {/* Key Features Section */}
      <section id="features" className={styles.features}>
        <h2>Why Choose FamilyFund?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💰</div>
            <h3>Financial Planning</h3>
            <p>Access tools and resources to help you plan and manage your family's finances effectively.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📚</div>
            <h3>Educational Resources</h3>
            <p>Find curated learning materials and guides for children of all ages.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏥</div>
            <h3>Health & Wellness</h3>
            <p>Discover tips and resources for maintaining family health and wellness.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <h2>How FamilyFund Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Create Your Profile</h3>
            <p>Set up your family profile and customize your preferences.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Explore Resources</h3>
            <p>Browse through our curated collection of family resources.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Get Started</h3>
            <p>Begin your journey towards better family financial planning.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={styles.testimonials}>
        <h2>What Families Say</h2>
        <div className={styles.testimonialGrid}>
          <div className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              "FamilyFund has been a game-changer for our family's financial planning. The resources are practical and easy to understand."
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>JS</div>
              <div className={styles.authorInfo}>
                <h4>John Smith</h4>
                <p>Parent of two</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              "The educational resources have been invaluable for our children's learning journey. Highly recommended!"
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>MD</div>
              <div className={styles.authorInfo}>
                <h4>Maria Davis</h4>
                <p>Parent of three</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of families who trust FamilyFund for their financial planning needs.</p>
        <button
          className={styles.ctaButton}
          onClick={() => navigate('/signup')}
        >
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default Home; 