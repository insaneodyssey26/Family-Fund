import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ResourceCard.module.css';

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  location?: string;
  id?: string;
  instructorId?: number;
  instructorName?: string;
  instructorRole?: string;
  imageUrl?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  category,
  location,
  id,
  instructorId,
  instructorName,
  instructorRole,
  imageUrl
}) => {
  const navigate = useNavigate();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id) {
      navigate(`/resources/${id}`);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.overlay}>
        <button
          className={styles.viewDetails}
          onClick={handleViewDetails}
          aria-label={`View details for ${title}`}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ResourceCard; 