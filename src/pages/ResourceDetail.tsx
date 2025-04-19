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
        instructor: 'Michael Chen',
        instructorId: 2,
        instructorRole: 'Financial Advisor',
        prerequisites: 'None',
        materials: 'Digital guidebook, calculators, and templates',
        registrationLink: '#',
        imageUrl: '/images/education.jpg'
    },
    'healthcare-options-seminar': {
        title: 'Healthcare Options Seminar',
        category: 'Healthcare',
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
        registrationLink: '#',
        imageUrl: '/images/healthcare.jpg'
    },
    'home-buying-workshop': {
        title: 'Home Buying Workshop',
        category: 'Housing',
        location: 'Online',
        date: 'Available Anytime',
        duration: 'Self-paced',
        description: 'Expert advice on buying your first family home.',
        detailedDescription: `
      This workshop covers essential topics for first-time home buyers:
      - Understanding mortgage options
      - Down payment strategies
      - Home inspection essentials
      - Negotiation techniques
      - Closing process overview
      - First-time buyer programs
    `,
        instructor: 'Robert Martinez',
        instructorId: 4,
        instructorRole: 'Real Estate Expert',
        prerequisites: 'None',
        materials: 'Digital home buying guide, mortgage calculators, and checklists',
        registrationLink: '#',
        imageUrl: '/images/housing.jpg'
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
        registrationLink: '#',
        imageUrl: '/images/tax.jpg'
    },
    'childcare-resources': {
        title: 'Childcare Resources',
        category: 'Family',
        location: 'Boston, MA',
        date: 'July 22, 2025',
        duration: '2.5 hours',
        description: 'Finding quality childcare options in your area.',
        detailedDescription: `
      This seminar covers important childcare topics:
      - Types of childcare options
      - Evaluating childcare providers
      - Cost considerations and budgeting
      - Safety and quality standards
      - Government assistance programs
      - Work-life balance strategies
    `,
        instructor: 'Lisa Thompson',
        instructorId: 6,
        instructorRole: 'Early Childhood Expert',
        prerequisites: 'None',
        materials: 'Childcare evaluation toolkit and local resource directory',
        registrationLink: '#',
        imageUrl: '/images/childcare.jpg'
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
        // Check if user is logged in - replace with your actual auth check
        const isLoggedIn = localStorage.getItem('userToken');

        if (!isLoggedIn) {
            setShowLoginPrompt(true);
            return;
        }

        navigate(`/register-resource/${resourceId}`);
    };

    const handleLogin = () => {
        // Store the current URL to redirect back after login
        localStorage.setItem('redirectAfterLogin', `/resources/${resourceId}`);
        navigate('/login');
    };

    const handleInstructorClick = (e: React.MouseEvent) => {
        e.stopPropagation();
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
                            <div
                                className={styles.instructorInfo}
                                onClick={handleInstructorClick}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleInstructorClick(e as any);
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
                            onClick={handleRegisterClick}
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