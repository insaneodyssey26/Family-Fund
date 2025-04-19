import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/FeaturedResources.module.css';

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 'finance',
      title: 'Finance & Budgeting',
      description: 'Resources for managing family finances, budgeting, and financial planning.',
      category: 'Finance',
      imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Learning resources and educational support for children and parents.',
      category: 'Education',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
    },
    {
      id: 'health',
      title: 'Health & Wellness',
      description: 'Resources for family health, wellness, and healthcare planning.',
      category: 'Health',
      imageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
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