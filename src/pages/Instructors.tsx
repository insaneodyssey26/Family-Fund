import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Instructors.module.css';

interface Instructor {
    id: number;
    name: string;
    role: string;
    expertise: string[];
    gradientColors?: string[];
}

const instructors: Instructor[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Financial Advisor",
        expertise: ["Budgeting", "Investment Planning", "Retirement Planning"],
        gradientColors: ["#FF6B6B", "#FF8E8E"]
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Investment Specialist",
        expertise: ["Stock Market", "Real Estate", "Risk Management"],
        gradientColors: ["#4FACFE", "#00F2FE"]
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Family Finance Coach",
        expertise: ["Family Budgeting", "Debt Management", "Financial Education"],
        gradientColors: ["#43E97B", "#38F9D7"]
    },
    {
        id: 4,
        name: "David Thompson",
        role: "Wealth Management Expert",
        expertise: ["Estate Planning", "Tax Strategies", "Asset Protection"],
        gradientColors: ["#FA709A", "#FEE140"]
    },
    {
        id: 5,
        name: "Lisa Martinez",
        role: "Personal Finance Educator",
        expertise: ["Financial Literacy", "Credit Management", "Saving Strategies"],
        gradientColors: ["#6C5CE7", "#A594F9"]
    },
    {
        id: 6,
        name: "James Wilson",
        role: "Retirement Planning Specialist",
        expertise: ["Pension Planning", "Social Security", "401(k) Management"],
        gradientColors: ["#45B649", "#96E6A1"]
    },
    {
        id: 7,
        name: "Rachel Kim",
        role: "Investment Analyst",
        expertise: ["Market Analysis", "Portfolio Diversification", "Risk Assessment"],
        gradientColors: ["#FF3CAC", "#784BA0"]
    },
    {
        id: 8,
        name: "Thomas Anderson",
        role: "Financial Coach",
        expertise: ["Debt Reduction", "Budget Creation", "Financial Goal Setting"],
        gradientColors: ["#2F80ED", "#56CCF2"]
    },
    {
        id: 9,
        name: "Patricia Lee",
        role: "Tax Planning Expert",
        expertise: ["Tax Optimization", "Deductions", "Tax-Efficient Investing"],
        gradientColors: ["#F2994A", "#F2C94C"]
    },
    {
        id: 10,
        name: "Robert Garcia",
        role: "Family Wealth Advisor",
        expertise: ["Generational Wealth", "Trust Planning", "Family Business Succession"],
        gradientColors: ["#11998E", "#38EF7D"]
    },
    {
        id: 11,
        name: "Jennifer Park",
        role: "Financial Wellness Coach",
        expertise: ["Money Mindset", "Financial Stress Management", "Behavioral Finance"],
        gradientColors: ["#FC466B", "#3F5EFB"]
    },
    {
        id: 12,
        name: "William Brown",
        role: "Investment Strategist",
        expertise: ["Market Timing", "Sector Analysis", "Investment Psychology"],
        gradientColors: ["#8E2DE2", "#4A00E0"]
    }
];

const Instructors: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedExpertise, setSelectedExpertise] = useState<string>('');

    // Get unique expertise areas for filter
    const allExpertise = Array.from(
        new Set(instructors.flatMap(instructor => instructor.expertise))
    ).sort();

    // Filter instructors based on search and expertise
    const filteredInstructors = instructors.filter(instructor => {
        const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            instructor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            instructor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesExpertise = !selectedExpertise || instructor.expertise.includes(selectedExpertise);

        return matchesSearch && matchesExpertise;
    });

    const handleInstructorClick = (id: number) => {
        navigate(`/instructors/${id}`);
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('');
    };

    return (
        <div className={styles.instructorsContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Our Expert Instructors</h1>
                <p className={styles.subtitle}>Learn from experienced professionals in family financial management</p>
            </div>

            <div className={styles.filters}>
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search by name, role, or expertise..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                <select
                    value={selectedExpertise}
                    onChange={(e) => setSelectedExpertise(e.target.value)}
                    className={styles.expertiseFilter}
                >
                    <option value="">All Expertise Areas</option>
                    {allExpertise.map(expertise => (
                        <option key={expertise} value={expertise}>{expertise}</option>
                    ))}
                </select>
            </div>

            <div className={styles.instructorsGrid}>
                {filteredInstructors.map((instructor) => (
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
                        <div
                            className={styles.instructorHeader}
                            style={{
                                background: instructor.gradientColors
                                    ? `linear-gradient(135deg, ${instructor.gradientColors[0]}, ${instructor.gradientColors[1]})`
                                    : 'var(--primary-color, #6C5CE7)'
                            }}
                        >
                            <div className={styles.initialsCircle}>
                                {getInitials(instructor.name)}
                            </div>
                        </div>
                        <div className={styles.instructorInfo}>
                            <h2 className={styles.instructorName}>{instructor.name}</h2>
                            <p className={styles.instructorRole}>{instructor.role}</p>
                            <div className={styles.expertiseContainer}>
                                {instructor.expertise.map((skill, index) => (
                                    <span key={index} className={styles.expertiseTag}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Instructors; 