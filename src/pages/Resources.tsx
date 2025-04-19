import React from 'react';
import ResourceCard from '../components/ResourceCard';
import styles from '../styles/Resources.module.css';

// Dummy data for resources
export const resources = [
  // Finance Resources
  {
    id: 'financial-planning-workshop',
    title: 'Financial Planning Workshop',
    description: 'Learn essential financial planning strategies for your family\'s future.',
    category: 'Finance',
    location: 'New York, NY',
    date: 'July 8, 2025',
    duration: '2 hours',
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
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
  },
  {
    id: 'tax-planning-guide',
    title: 'Tax Planning Guide',
    description: 'Strategies for optimizing your family\'s tax situation.',
    category: 'Finance',
    location: 'Online',
    date: 'Available Anytime',
    duration: 'Self-paced',
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
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
  },
  {
    id: 'investment-strategies',
    title: 'Family Investment Strategies',
    description: 'Learn how to build and manage a family investment portfolio.',
    category: 'Finance',
    location: 'Online',
    date: 'Available Anytime',
    duration: 'Self-paced',
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
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
  },

  // Education Resources
  {
    id: 'college-savings-guide',
    title: 'College Savings Guide',
    description: 'Comprehensive guide to saving for your child\'s education.',
    category: 'Education',
    location: 'Online',
    date: 'Available Anytime',
    duration: 'Self-paced',
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
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
  },
  {
    id: 'early-learning',
    title: 'Early Childhood Education',
    description: 'Resources and strategies for early childhood development.',
    category: 'Education',
    location: 'Online',
    date: 'Available Anytime',
    duration: 'Self-paced',
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
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
  },
  {
    id: 'homeschool-resources',
    title: 'Homeschool Resources',
    description: 'Comprehensive guide to homeschooling your children.',
    category: 'Education',
    location: 'Online',
    date: 'Available Anytime',
    duration: 'Self-paced',
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
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
  },

  // Health Resources
  {
    id: 'healthcare-options-seminar',
    title: 'Healthcare Options Seminar',
    description: 'Understanding healthcare options and insurance for families.',
    category: 'Health',
    location: 'Chicago, IL',
    date: 'July 15, 2025',
    duration: '3 hours',
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
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
  },
  {
    id: 'family-nutrition',
    title: 'Family Nutrition Guide',
    description: 'Learn about healthy eating habits for the whole family.',
    category: 'Health',
    location: 'Online',
    date: 'Available Anytime',
    duration: 'Self-paced',
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
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
  },
  {
    id: 'mental-health',
    title: 'Family Mental Health Resources',
    description: 'Resources for maintaining family mental health and wellness.',
    category: 'Health',
    location: 'Online',
    date: 'Available Anytime',
    duration: 'Self-paced',
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
    imageUrl: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
  }
];

const Resources: React.FC = () => {
  return (
    <div className={styles.resources}>
      <h1>Available Resources</h1>
      <div className={styles.resourcesGrid}>
        {resources.map((resource) => (
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

export default Resources; 