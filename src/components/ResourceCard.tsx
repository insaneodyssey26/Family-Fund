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

  const handleResourceClick = () => {
    if (id) {
      navigate(`/resources/${id}`);
    }
  };

  const handleInstructorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (instructorId) {
      navigate(`/instructors/${instructorId}`);
    }
  };

  return (
    <div className={styles.card} onClick={handleResourceClick}>
      {imageUrl && (
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={title} className={styles.image} />
        </div>
      )}
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
        {instructorName && (
          <div className={styles.instructorInfo} onClick={handleInstructorClick}>
            <div className={styles.instructorIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#666" />
              </svg>
            </div>
            <div className={styles.instructorDetails}>
              <span className={styles.instructorName}>{instructorName}</span>
              <span className={styles.instructorRole}>{instructorRole}</span>
            </div>
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