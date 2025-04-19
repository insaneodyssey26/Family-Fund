import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/InstructorDetail.module.css';

interface Instructor {
    id: number;
    name: string;
    role: string;
    expertise: string[];
    bio: string;
    experience: string;
    education: string[];
    achievements: string[];
}

const instructors: Instructor[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Financial Advisor",
        expertise: ["Budgeting", "Investment Planning", "Retirement Planning"],
        bio: "With over 15 years of experience in financial planning, Sarah has helped hundreds of families achieve their financial goals. She specializes in creating personalized financial strategies that align with family values and long-term objectives.",
        experience: "15+ years in financial planning, Certified Financial Planner (CFP), Former Senior Advisor at Wealth Management Inc.",
        education: ["MBA in Finance, Harvard Business School", "BS in Economics, Stanford University"],
        achievements: ["Top Financial Advisor 2022", "Author of 'Family Finance Made Simple'", "Regular contributor to Financial Times"]
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Investment Specialist",
        expertise: ["Stock Market", "Real Estate", "Risk Management"],
        bio: "Michael brings a unique perspective to investment strategies, combining his Wall Street experience with a deep understanding of family financial dynamics. His approach focuses on sustainable growth and risk management.",
        experience: "12 years as a Wall Street analyst, Founder of Chen Investment Strategies, Regular market commentator on CNBC",
        education: ["MS in Financial Engineering, MIT", "BS in Mathematics, University of Chicago"],
        achievements: ["Forbes 30 Under 30 in Finance", "Best Investment Strategy Award 2021", "Published research in Journal of Finance"]
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Family Finance Coach",
        expertise: ["Family Budgeting", "Debt Management", "Financial Education"],
        bio: "Emily is passionate about making financial education accessible to families. Her practical approach to money management has helped countless families break free from debt and build sustainable wealth.",
        experience: "10 years in financial coaching, Founder of Family Finance Academy, TEDx speaker on financial literacy",
        education: ["MA in Financial Planning, NYU", "BS in Psychology, University of Texas"],
        achievements: ["Financial Educator of the Year 2023", "Author of 'The Family Money Blueprint'", "Featured in Money Magazine"]
    },
    {
        id: 4,
        name: "David Thompson",
        role: "Wealth Management Expert",
        expertise: ["Estate Planning", "Tax Strategies", "Asset Protection"],
        bio: "David specializes in helping families preserve and grow their wealth across generations. His expertise in estate planning and tax optimization has saved clients millions in potential tax liabilities.",
        experience: "18 years in wealth management, Partner at Thompson Wealth Advisors, Former IRS consultant",
        education: ["JD in Tax Law, Georgetown University", "MBA in Finance, Wharton School"],
        achievements: ["Top 100 Wealth Advisors 2023", "Estate Planning Excellence Award", "Regular speaker at Wealth Management Conferences"]
    },
    {
        id: 5,
        name: "Lisa Martinez",
        role: "Personal Finance Educator",
        expertise: ["Financial Literacy", "Credit Management", "Saving Strategies"],
        bio: "Lisa's mission is to make financial education engaging and accessible. Her innovative teaching methods have helped thousands of families improve their financial literacy and money management skills.",
        experience: "8 years in financial education, Director of Financial Literacy Programs, Host of 'Money Matters' podcast",
        education: ["MA in Education, Columbia University", "BS in Economics, University of California"],
        achievements: ["Financial Education Innovator Award", "Best Financial Podcast 2022", "Author of 'Money Smart Families'"]
    },
    {
        id: 6,
        name: "James Wilson",
        role: "Retirement Planning Specialist",
        expertise: ["Pension Planning", "Social Security", "401(k) Management"],
        bio: "James helps families navigate the complex world of retirement planning. His comprehensive approach ensures clients can retire with confidence and financial security.",
        experience: "20 years in retirement planning, Senior Retirement Consultant, Social Security expert",
        education: ["PhD in Financial Planning, Boston University", "MS in Actuarial Science, University of Michigan"],
        achievements: ["Retirement Planning Excellence Award", "Author of 'The Retirement Roadmap'", "Regular contributor to AARP"]
    },
    {
        id: 7,
        name: "Rachel Kim",
        role: "Investment Analyst",
        expertise: ["Market Analysis", "Portfolio Diversification", "Risk Assessment"],
        bio: "Rachel's analytical approach to investment strategy has helped families build robust portfolios that weather market fluctuations. Her focus on data-driven decision making sets her apart in the industry.",
        experience: "9 years in investment analysis, Senior Portfolio Manager, Market Research Director",
        education: ["MS in Financial Analysis, London School of Economics", "BS in Statistics, University of Washington"],
        achievements: ["Best Investment Research 2023", "Top 40 Under 40 in Finance", "Regular market analyst on Bloomberg TV"]
    },
    {
        id: 8,
        name: "Thomas Anderson",
        role: "Financial Coach",
        expertise: ["Debt Reduction", "Budget Creation", "Financial Goal Setting"],
        bio: "Thomas specializes in helping families break free from debt and build sustainable financial habits. His practical, step-by-step approach has transformed countless family finances.",
        experience: "11 years in financial coaching, Founder of Debt-Free Families, Financial Wellness Speaker",
        education: ["MA in Financial Counseling, Texas Tech University", "BS in Business Administration, University of Florida"],
        achievements: ["Financial Coach of the Year 2022", "Author of 'The Debt-Free Family'", "Featured in Forbes"]
    },
    {
        id: 9,
        name: "Patricia Lee",
        role: "Tax Planning Expert",
        expertise: ["Tax Optimization", "Deductions", "Tax-Efficient Investing"],
        bio: "Patricia helps families minimize their tax burden while maximizing their financial growth. Her expertise in tax law and investment strategies provides clients with comprehensive tax planning solutions.",
        experience: "14 years in tax planning, Senior Tax Consultant, Former IRS agent",
        education: ["JD in Tax Law, NYU", "MS in Taxation, University of Southern California"],
        achievements: ["Tax Planning Excellence Award", "Top 50 Women in Tax", "Regular contributor to Tax Journal"]
    },
    {
        id: 10,
        name: "Robert Garcia",
        role: "Family Wealth Advisor",
        expertise: ["Generational Wealth", "Trust Planning", "Family Business Succession"],
        bio: "Robert specializes in helping families preserve and grow their wealth across generations. His expertise in family business succession and trust planning has helped numerous families maintain their legacy.",
        experience: "16 years in wealth management, Family Office Director, Succession Planning Expert",
        education: ["MBA in Family Business, INSEAD", "BS in Finance, University of Miami"],
        achievements: ["Family Wealth Advisor of the Year", "Author of 'Generational Wealth'", "Regular speaker at Family Office Conferences"]
    },
    {
        id: 11,
        name: "Jennifer Park",
        role: "Financial Wellness Coach",
        expertise: ["Money Mindset", "Financial Stress Management", "Behavioral Finance"],
        bio: "Jennifer combines financial expertise with psychological insights to help families develop healthy money habits. Her holistic approach addresses both the practical and emotional aspects of financial management.",
        experience: "7 years in financial wellness, Certified Financial Therapist, Wellness Program Director",
        education: ["MA in Psychology, University of California", "BS in Finance, University of Illinois"],
        achievements: ["Financial Wellness Innovator Award", "Author of 'Money and Mindset'", "TEDx speaker on financial psychology"]
    },
    {
        id: 12,
        name: "William Brown",
        role: "Investment Strategist",
        expertise: ["Market Timing", "Sector Analysis", "Investment Psychology"],
        bio: "William's strategic approach to investing helps families navigate market cycles and build resilient portfolios. His focus on behavioral finance helps clients make better investment decisions.",
        experience: "13 years in investment strategy, Chief Investment Officer, Market Strategy Director",
        education: ["PhD in Finance, University of Pennsylvania", "MS in Economics, University of Chicago"],
        achievements: ["Investment Strategy Excellence Award", "Author of 'Strategic Investing'", "Regular market strategist on CNBC"]
    }
];

const InstructorDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const instructor = instructors.find(instructor => instructor.id === Number(id));

    if (!instructor) {
        return <div>Instructor not found</div>;
    }

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => navigate('/instructors')}>
                ← Back to Instructors
            </button>

            <div className={styles.instructorDetail}>
                <div className={styles.header}>
                    <div className={styles.profileSection}>
                        <div className={styles.profileIcon}>
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#666" />
                            </svg>
                        </div>
                        <div className={styles.headerInfo}>
                            <h1 className={styles.name}>{instructor.name}</h1>
                            <p className={styles.role}>{instructor.role}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>About</h2>
                    <p className={styles.bio}>{instructor.bio}</p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Experience</h2>
                    <p className={styles.experience}>{instructor.experience}</p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Education</h2>
                    <ul className={styles.educationList}>
                        {instructor.education.map((item, index) => (
                            <li key={index} className={styles.educationItem}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Expertise</h2>
                    <div className={styles.expertiseContainer}>
                        {instructor.expertise.map((skill, index) => (
                            <span key={index} className={styles.expertiseTag}>{skill}</span>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Achievements</h2>
                    <ul className={styles.achievementsList}>
                        {instructor.achievements.map((item, index) => (
                            <li key={index} className={styles.achievementItem}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default InstructorDetail; 