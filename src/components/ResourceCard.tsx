import React from 'react';
import styles from '../styles/ResourceCard.module.css';

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  location: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  category,
  location,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.mapPlaceholder}>
        <span className={styles.mapText}>Map View</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.meta}>
          <span className={styles.category}>{category}</span>
          <span className={styles.location}>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard; 