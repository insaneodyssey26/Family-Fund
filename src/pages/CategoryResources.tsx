import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';
import styles from '../styles/CategoryResources.module.css';

// Import the resources data
import { resources } from './Resources';

const CategoryResources: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();

    // Handle case where category is undefined
    if (!category) {
        navigate('/resources');
        return null;
    }

    // Filter resources by category
    const categoryResources = resources.filter(
        resource => resource.category.toLowerCase() === category.toLowerCase()
    );

    // If no resources found, show a message
    if (categoryResources.length === 0) {
        return (
            <div className={styles.categoryResources}>
                <h1>No Resources Found</h1>
                <p className={styles.description}>
                    No resources found for the category "{category}".
                </p>
                <button
                    className={styles.backButton}
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </button>
            </div>
        );
    }

    // Get the category name for display
    const categoryName = categoryResources[0].category;

    return (
        <div className={styles.categoryResources}>
            <h1>{categoryName} Resources</h1>
            <p className={styles.description}>
                Explore our comprehensive collection of {categoryName.toLowerCase()} resources for your family.
            </p>
            <div className={styles.resourcesGrid}>
                {categoryResources.map((resource) => (
                    <ResourceCard
                        key={resource.id}
                        id={resource.id}
                        title={resource.title}
                        description={resource.description}
                        category={resource.category}
                        location={resource.location}
                        imageUrl={resource.imageUrl}
                        date={resource.date}
                        duration={resource.duration}
                        detailedDescription={resource.detailedDescription}
                        prerequisites={resource.prerequisites}
                        materials={resource.materials}
                        instructorId={resource.instructorId}
                        instructorName={resource.instructor}
                        instructorRole={resource.instructorRole}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryResources; 