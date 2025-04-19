import React from 'react';
import ResourceCard from '../components/ResourceCard';
import styles from '../styles/Resources.module.css';

// Dummy data for resources
const resources = [
  {
    id: 'financial-planning-workshop',
    title: 'Financial Planning Workshop',
    description: 'Learn essential financial planning strategies for your family\'s future.',
    category: 'Finance',
    location: 'New York, NY',
  },
  {
    id: 'college-savings-guide',
    title: 'College Savings Guide',
    description: 'Comprehensive guide to saving for your child\'s education.',
    category: 'Education',
    location: 'Online',
  },
  {
    id: 'healthcare-options-seminar',
    title: 'Healthcare Options Seminar',
    description: 'Understanding healthcare options and insurance for families.',
    category: 'Healthcare',
    location: 'Chicago, IL',
  },
  {
    id: 'home-buying-workshop',
    title: 'Home Buying Workshop',
    description: 'Expert advice on buying your first family home.',
    category: 'Housing',
    location: 'Los Angeles, CA',
  },
  {
    id: 'tax-planning-guide',
    title: 'Tax Planning Guide',
    description: 'Strategies for optimizing your family\'s tax situation.',
    category: 'Finance',
    location: 'Online',
  },
  {
    id: 'childcare-resources',
    title: 'Childcare Resources',
    description: 'Finding quality childcare options in your area.',
    category: 'Family',
    location: 'Boston, MA',
  },
];

const Resources: React.FC = () => {
  return (
    <div className={styles.resources}>
      <h1>Available Resources</h1>
      <div className={styles.resourcesGrid}>
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            title={resource.title}
            description={resource.description}
            category={resource.category}
            location={resource.location}
          />
        ))}
      </div>
    </div>
  );
};

export default Resources; 