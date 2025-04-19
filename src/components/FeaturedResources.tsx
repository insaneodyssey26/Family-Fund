import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResourceCard from './ResourceCard';
import styles from '../styles/FeaturedResources.module.css';

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 'finance',
      title: 'Finance & Budgeting',
      description: 'Resources for managing family finances, budgeting, and financial planning.',
      category: 'Finance',
      imageUrl: 'https://placehold.co/600x400/6C5CE7/FFFFFF?text=Finance',
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Learning resources and educational support for children and parents.',
      category: 'Education',
      imageUrl: 'https://placehold.co/600x400/00b894/FFFFFF?text=Education',
    },
    {
      id: 'health',
      title: 'Health & Wellness',
      description: 'Resources for family health, wellness, and healthcare planning.',
      category: 'Health',
      imageUrl: 'https://placehold.co/600x400/fd79a8/FFFFFF?text=Health',
    }
  ];

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Resource Categories</h2>
        <p className={styles.subtitle}>Explore our comprehensive collection of family resources</p>
        <div className={styles.grid}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={styles.categoryCard}
              onClick={() => handleCategoryClick(category.category)}
            >
              <div className={styles.categoryImage}>
                <img src={category.imageUrl} alt={category.title} />
              </div>
              <div className={styles.categoryContent}>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <button
                  className={styles.viewButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.category);
                  }}
                >
                  View Resources
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories; 