import React from 'react';
import ResourceCard from './ResourceCard';
import styles from '../styles/FeaturedResources.module.css';

const FeaturedResources: React.FC = () => {
  const resources = [
    {
      title: 'Family Budget Planner',
      description: 'A comprehensive guide to managing your family finances effectively.',
      category: 'Finance',
      imageUrl: '/images/budget-planner.jpg',
    },
    {
      title: 'Educational Resources',
      description: 'Curated learning materials for children of all ages.',
      category: 'Education',
      imageUrl: '/images/education.jpg',
    },
    {
      title: 'Health & Wellness',
      description: 'Tips and resources for maintaining family health and wellness.',
      category: 'Health',
      imageUrl: '/images/health.jpg',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Featured Resources</h2>
        <p className={styles.subtitle}>Discover helpful tools and information for your family</p>
        <div className={styles.grid}>
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              title={resource.title}
              description={resource.description}
              category={resource.category}
              imageUrl={resource.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedResources; 