import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/RegisterResource.module.css';

const RegisterResource: React.FC = () => {
    const { resourceId } = useParams<{ resourceId: string }>();

    return (
        <div className={styles.container}>
            <h1>Register Resource</h1>
            <p>Resource ID: {resourceId}</p>
            {/* Add your resource registration form here */}
        </div>
    );
};

export default RegisterResource; 