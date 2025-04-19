import React, { useState } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
          <span className={styles.viewDetails} onClick={handleViewDetails}>
            View Details
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modal} onClick={handleModalClick}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={styles.modalContent}>
              <div className={styles.modalImageContainer}>
                <img src={imageUrl} alt={title} className={styles.modalImage} />
              </div>
              <div className={styles.modalText}>
                <span className={styles.modalCategory}>{category}</span>
                <h2 className={styles.modalTitle}>{title}</h2>
                <p className={styles.modalDescription}>{description}</p>
                <div className={styles.modalFeatures}>
                  <h3>Key Features</h3>
                  <ul>
                    <li>Interactive learning materials</li>
                    <li>Step-by-step guides</li>
                    <li>Downloadable resources</li>
                    <li>Expert tips and advice</li>
                  </ul>
                </div>
                <div className={styles.modalActions}>
                  <button className={styles.downloadButton}>
                    Download Guide
                  </button>
                  <button className={styles.shareButton}>
                    Share Resource
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResourceCard; 