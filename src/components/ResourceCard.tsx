import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ResourceCard.module.css';

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  location?: string;
  id?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  category,
  location,
  id
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id) {
      navigate(`/resources/${id}`);
    }
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.content}>
        <div className={styles.category}>{category}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {location && (
          <div className={styles.location}>
            <span className={styles.locationIcon}>📍</span>
            {location}
          </div>
        )}
      </div>
      <div className={styles.overlay}>
        <span className={styles.viewDetails}>View Details</span>
      </div>
    </div>
  );
};

export default ResourceCard; 