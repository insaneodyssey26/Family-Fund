import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Instructors.module.css';

interface Instructor {
    id: number;
    name: string;
    role: string;
    expertise: string[];
}

const instructors: Instructor[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Financial Advisor",
        expertise: ["Budgeting", "Investment Planning", "Retirement Planning"]
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Investment Specialist",
        expertise: ["Stock Market", "Real Estate", "Risk Management"]
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Family Finance Coach",
        expertise: ["Family Budgeting", "Debt Management", "Financial Education"]
    },
    {
        id: 4,
        name: "David Thompson",
        role: "Wealth Management Expert",
        expertise: ["Estate Planning", "Tax Strategies", "Asset Protection"]
    },
    {
        id: 5,
        name: "Lisa Martinez",
        role: "Personal Finance Educator",
        expertise: ["Financial Literacy", "Credit Management", "Saving Strategies"]
    },
    {
        id: 6,
        name: "James Wilson",
        role: "Retirement Planning Specialist",
        expertise: ["Pension Planning", "Social Security", "401(k) Management"]
    },
    {
        id: 7,
        name: "Rachel Kim",
        role: "Investment Analyst",
        expertise: ["Market Analysis", "Portfolio Diversification", "Risk Assessment"]
    },
    {
        id: 8,
        name: "Thomas Anderson",
        role: "Financial Coach",
        expertise: ["Debt Reduction", "Budget Creation", "Financial Goal Setting"]
    },
    {
        id: 9,
        name: "Patricia Lee",
        role: "Tax Planning Expert",
        expertise: ["Tax Optimization", "Deductions", "Tax-Efficient Investing"]
    },
    {
        id: 10,
        name: "Robert Garcia",
        role: "Family Wealth Advisor",
        expertise: ["Generational Wealth", "Trust Planning", "Family Business Succession"]
    },
    {
        id: 11,
        name: "Jennifer Park",
        role: "Financial Wellness Coach",
        expertise: ["Money Mindset", "Financial Stress Management", "Behavioral Finance"]
    },
    {
        id: 12,
        name: "William Brown",
        role: "Investment Strategist",
        expertise: ["Market Timing", "Sector Analysis", "Investment Psychology"]
    }
];

const Instructors: React.FC = () => {
    const navigate = useNavigate();

    const handleInstructorClick = (id: number) => {
        navigate(`/instructors/${id}`);
    };

    return (
        <div className={styles.instructorsContainer}>
            <h1 className={styles.title}>Our Expert Instructors</h1>
            <p className={styles.subtitle}>Learn from experienced professionals in family financial management</p>

            <div className={styles.instructorsGrid}>
                {instructors.map((instructor) => (
                    <div
                        key={instructor.id}
                        className={styles.instructorCard}
                        onClick={() => handleInstructorClick(instructor.id)}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleInstructorClick(instructor.id);
                            }
                        }}
                    >
                        <h2 className={styles.instructorName}>{instructor.name}</h2>
                        <p className={styles.instructorRole}>{instructor.role}</p>
                        <div className={styles.expertiseContainer}>
                            {instructor.expertise.map((skill, index) => (
                                <span key={index} className={styles.expertiseTag}>{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Instructors; 