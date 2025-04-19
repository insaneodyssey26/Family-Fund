import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/ResourceDetail.module.css';
import transition from '../styles/PageTransition.module.css';

// Mock data for resource details
const resourceDetails = {
    'financial-planning-workshop': {
        title: 'Financial Planning Workshop',
        category: 'Finance',
        location: 'New York, NY',
        date: 'March 15, 2024',
        duration: '2 hours',
        description: 'Learn essential financial planning strategies for your family\'s future.',
        detailedDescription: `
      This comprehensive workshop covers all aspects of family financial planning, including:
      - Budgeting and expense tracking
      - Investment strategies for families
      - College savings plans
      - Retirement planning
      - Insurance needs assessment
      - Estate planning basics
    `,
        instructor: 'Sarah Johnson, CFP',
        prerequisites: 'Basic understanding of personal finance',
        materials: 'Participants will receive a comprehensive workbook and access to online resources',
        registrationLink: '#',
        imageUrl: '/images/workshop.jpg'
    },
    'college-savings-guide': {
        title: 'College Savings Guide',
        category: 'Education',
        location: 'Online',
        date: 'Available Anytime',
        duration: 'Self-paced',
        description: 'Comprehensive guide to saving for your child\'s education.',
        detailedDescription: `
      This detailed guide includes:
      - Understanding 529 plans and other college savings options
      - Calculating college costs and savings goals
      - Tax benefits and financial aid considerations
      - Investment strategies for education savings
      - Case studies and success stories
    `,
        instructor: 'Michael Chen, Financial Advisor',
        prerequisites: 'None',
        materials: 'Digital guidebook, calculators, and templates',
        registrationLink: '#',
        imageUrl: '/images/education.jpg'
    },
    'healthcare-options-seminar': {
        title: 'Healthcare Options Seminar',
        category: 'Healthcare',
        location: 'Chicago, IL',
        date: 'April 5, 2024',
        duration: '3 hours',
        description: 'Understanding healthcare options and insurance for families.',
        detailedDescription: `
      Topics covered in this seminar:
      - Health insurance options for families
      - Understanding deductibles and copays
      - HSA and FSA accounts
      - Special needs healthcare planning
      - Emergency fund considerations
    `,
        instructor: 'Dr. Emily Rodriguez, Healthcare Consultant',
        prerequisites: 'None',
        materials: 'Healthcare planning workbook and resource directory',
        registrationLink: '#',
        imageUrl: '/images/healthcare.jpg'
    }
};

const ResourceDetail: React.FC = () => {
    const { resourceId } = useParams<{ resourceId: string }>();
    const navigate = useNavigate();
    const [resource, setResource] = useState<any>(null);

    useEffect(() => {
        if (resourceId && resourceDetails[resourceId as keyof typeof resourceDetails]) {
            setResource(resourceDetails[resourceId as keyof typeof resourceDetails]);
        } else {
            navigate('/resources');
        }
    }, [resourceId, navigate]);

    if (!resource) return null;

    return (
        <div className={`${styles.container} ${transition.content}`}>
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>{resource.title}</h1>
                    <div className={styles.metaInfo}>
                        <span className={styles.category}>{resource.category}</span>
                        <span className={styles.location}>{resource.location}</span>
                        <span className={styles.date}>{resource.date}</span>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.mainContent}>
                    <div className={styles.description}>
                        <h2>About This Resource</h2>
                        <p>{resource.description}</p>
                        <div className={styles.detailedDescription}>
                            {resource.detailedDescription.split('\n').map((line, index) => (
                                <p key={index}>{line.trim()}</p>
                            ))}
                        </div>
                    </div>

                    <div className={styles.details}>
                        <h2>Details</h2>
                        <div className={styles.detailItem}>
                            <h3>Duration</h3>
                            <p>{resource.duration}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h3>Instructor</h3>
                            <p>{resource.instructor}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h3>Prerequisites</h3>
                            <p>{resource.prerequisites}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h3>Materials</h3>
                            <p>{resource.materials}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.registrationCard}>
                        <h3>Register Now</h3>
                        <p>Secure your spot for this valuable resource</p>
                        <button
                            className={styles.registerButton}
                            onClick={() => window.open(resource.registrationLink, '_blank')}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetail; 