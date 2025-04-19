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
        date: 'July 8, 2025',
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
        instructor: 'Sarah Johnson',
        instructorId: 1,
        instructorRole: 'CFP',
        prerequisites: 'Basic understanding of personal finance',
        materials: 'Participants will receive a comprehensive workbook and access to online resources',
        imageUrl: 'https://placehold.co/1200x400/6C5CE7/FFFFFF?text=Financial+Planning',
    },
    'tax-planning-guide': {
        title: 'Tax Planning Guide',
        category: 'Finance',
        location: 'Online',
        date: 'Available Anytime',
        duration: 'Self-paced',
        description: 'Strategies for optimizing your family\'s tax situation.',
        detailedDescription: `
      Comprehensive tax planning topics include:
      - Tax deductions for families
      - Child tax credits
      - Education tax benefits
      - Investment tax strategies
      - Tax-efficient estate planning
      - Record keeping best practices
    `,
        instructor: 'David Wilson',
        instructorId: 5,
        instructorRole: 'CPA',
        prerequisites: 'Basic understanding of taxes',
        materials: 'Tax planning worksheets and digital resources',
        imageUrl: 'https://placehold.co/1200x400/6C5CE7/FFFFFF?text=Tax+Planning',
    },
    'investment-strategies': {
        title: 'Family Investment Strategies',
        category: 'Finance',
        location: 'Online',
        date: 'Available Anytime',
        duration: 'Self-paced',
        description: 'Learn how to build and manage a family investment portfolio.',
        detailedDescription: `
      Topics covered:
      - Understanding different investment vehicles
      - Risk management for family portfolios
      - Long-term investment strategies
      - College fund investments
      - Retirement account management
      - Diversification techniques
    `,
        instructor: 'Michael Chen',
        instructorId: 2,
        instructorRole: 'Investment Specialist',
        prerequisites: 'Basic understanding of investments',
        materials: 'Investment guide, portfolio templates, and calculators',
        imageUrl: 'https://placehold.co/1200x400/6C5CE7/FFFFFF?text=Investments',
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
        instructor: 'Michael Chen',
        instructorId: 2,
        instructorRole: 'Financial Advisor',
        prerequisites: 'None',
        materials: 'Digital guidebook, calculators, and templates',
        imageUrl: 'https://placehold.co/1200x400/00b894/FFFFFF?text=College+Savings',
    },
    'early-learning': {
        title: 'Early Childhood Education',
        category: 'Education',
        location: 'Online',
        date: 'Available Anytime',
        duration: 'Self-paced',
        description: 'Resources and strategies for early childhood development.',
        detailedDescription: `
      Topics covered:
      - Early learning milestones
      - Educational activities for young children
      - Reading readiness
      - Math concepts for preschoolers
      - Social-emotional development
      - Parent-child learning activities
    `,
        instructor: 'Lisa Thompson',
        instructorId: 6,
        instructorRole: 'Early Childhood Expert',
        prerequisites: 'None',
        materials: 'Activity guides, development charts, and resource lists',
        imageUrl: 'https://placehold.co/1200x400/00b894/FFFFFF?text=Early+Learning',
    },
    'homeschool-resources': {
        title: 'Homeschool Resources',
        category: 'Education',
        location: 'Online',
        date: 'Available Anytime',
        duration: 'Self-paced',
        description: 'Comprehensive guide to homeschooling your children.',
        detailedDescription: `
      This guide includes:
      - Curriculum planning and selection
      - Learning styles and teaching methods
      - Assessment and progress tracking
      - Socialization strategies
      - Resource recommendations
      - Legal requirements and documentation
    `,
        instructor: 'Emily Rodriguez',
        instructorId: 3,
        instructorRole: 'Education Specialist',
        prerequisites: 'None',
        materials: 'Curriculum guides, lesson plans, and assessment tools',
        imageUrl: 'https://placehold.co/1200x400/00b894/FFFFFF?text=Homeschool',
    },
    'healthcare-options-seminar': {
        title: 'Healthcare Options Seminar',
        category: 'Health',
        location: 'Chicago, IL',
        date: 'July 15, 2025',
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
        instructor: 'Dr. Emily Rodriguez',
        instructorId: 3,
        instructorRole: 'Healthcare Consultant',
        prerequisites: 'None',
        materials: 'Healthcare planning workbook and resource directory',
        imageUrl: 'https://placehold.co/1200x400/fd79a8/FFFFFF?text=Healthcare',
    },
    'family-nutrition': {
        title: 'Family Nutrition Guide',
        category: 'Health',
        location: 'Online',
        date: 'Available Anytime',
        duration: 'Self-paced',
        description: 'Learn about healthy eating habits for the whole family.',
        detailedDescription: `
      Topics covered:
      - Balanced meal planning
      - Nutritional needs by age
      - Healthy snack options
      - Meal prep strategies
      - Reading food labels
      - Special dietary considerations
    `,
        instructor: 'Dr. Sarah Wilson',
        instructorId: 7,
        instructorRole: 'Nutritionist',
        prerequisites: 'None',
        materials: 'Meal planning guides, recipes, and nutrition charts',
        imageUrl: 'https://placehold.co/1200x400/fd79a8/FFFFFF?text=Nutrition',
    },
    'mental-health': {
        title: 'Family Mental Health Resources',
        category: 'Health',
        location: 'Online',
        date: 'Available Anytime',
        duration: 'Self-paced',
        description: 'Resources for maintaining family mental health and wellness.',
        detailedDescription: `
      Topics covered:
      - Stress management techniques
      - Communication strategies
      - Building resilience
      - Recognizing mental health concerns
      - Accessing professional help
      - Self-care practices
    `,
        instructor: 'Dr. James Anderson',
        instructorId: 8,
        instructorRole: 'Family Therapist',
        prerequisites: 'None',
        materials: 'Mental health guides, activity worksheets, and resource directory',
        imageUrl: 'https://placehold.co/1200x400/fd79a8/FFFFFF?text=Mental+Health',
    }
};

const ResourceDetail: React.FC = () => {
    const { resourceId } = useParams<{ resourceId: string }>();
    const navigate = useNavigate();
    const [resource, setResource] = useState<any>(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    useEffect(() => {
        if (resourceId && resourceDetails[resourceId as keyof typeof resourceDetails]) {
            setResource(resourceDetails[resourceId as keyof typeof resourceDetails]);
        } else {
            navigate('/resources');
        }
    }, [resourceId, navigate]);

    if (!resource) return null;

    const handleRegisterClick = () => {
        const isLoggedIn = localStorage.getItem('userToken');
        if (!isLoggedIn) {
            setShowLoginPrompt(true);
            return;
        }
        navigate(`/register-resource/${resourceId}`);
    };

    const handleLogin = () => {
        localStorage.setItem('redirectAfterLogin', `/resources/${resourceId}`);
        navigate('/login');
    };

    const handleInstructorClick = () => {
        if (resource.instructorId) {
            navigate(`/instructors/${resource.instructorId}`);
        }
    };

    return (
        <div className={`${styles.container} ${transition.content}`}>
            {showLoginPrompt && (
                <div className={styles.loginPromptOverlay}>
                    <div className={styles.loginPrompt}>
                        <h3>Login Required</h3>
                        <p>Please log in to register for this resource.</p>
                        <div className={styles.loginPromptButtons}>
                            <button className={styles.loginButton} onClick={handleLogin}>
                                Log In
                            </button>
                            <button className={styles.cancelButton} onClick={() => setShowLoginPrompt(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.hero}>
                <div className={styles.heroImage}>
                    <img src={resource.imageUrl} alt={resource.title} />
                </div>
                <div className={styles.heroContent}>
                    <span className={styles.category}>{resource.category}</span>
                    <h1>{resource.title}</h1>
                    <div className={styles.metaInfo}>
                        <span className={styles.location}>�� {resource.location}</span>
                        <span className={styles.date}>📅 {resource.date}</span>
                        <span className={styles.duration}>⏱️ {resource.duration}</span>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.mainContent}>
                    <div className={styles.detailsSection}>
                        <h2 className={styles.sectionTitle}>About This Resource</h2>
                        <p className={styles.description}>{resource.description}</p>
                        <div className={styles.detailedDescription}>
                            {resource.detailedDescription
                                .split('\n')
                                .filter(line => line.trim() !== '')
                                .map((line, index) => (
                                    <p key={index}>{line.trim()}</p>
                                ))}
                        </div>
                    </div>

                    <div className={styles.detailsSection}>
                        <h2 className={styles.sectionTitle}>Details</h2>
                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}>
                                <h3>Prerequisites</h3>
                                <p>{resource.prerequisites}</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h3>Materials</h3>
                                <p>{resource.materials}</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h3>Instructor</h3>
                                <div
                                    className={styles.instructorInfo}
                                    onClick={handleInstructorClick}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            handleInstructorClick();
                                        }
                                    }}
                                >
                                    <div className={styles.instructorIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#666" />
                                        </svg>
                                    </div>
                                    <div className={styles.instructorDetails}>
                                        <span className={styles.instructorName}>{resource.instructor}</span>
                                        <span className={styles.instructorRole}>{resource.instructorRole}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.detailsSection}>
                        <h2 className={styles.sectionTitle}>Register Now</h2>
                        <div className={styles.registerSection}>
                            <div className={styles.registrationCard}>
                                <p>Secure your spot for this valuable resource</p>
                                <button
                                    className={styles.registerButton}
                                    onClick={handleRegisterClick}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetail; 