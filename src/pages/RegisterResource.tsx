import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/RegisterResource.module.css';

const RegisterResource: React.FC = () => {
    const { resourceId } = useParams<{ resourceId: string }>();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (!currentUser) {
                    navigate('/login', {
                        state: { from: location.pathname },
                        replace: true
                    });
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Auth check error:', error);
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [currentUser, navigate, location]);

    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            // Add your registration logic here
            console.log('Registering for resource:', resourceId);

            // After successful registration
            navigate(`/resources/${resourceId}`);
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
            </div>
        );
    }

    if (!currentUser) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.registrationCard}>
                <h1>Register for Resource</h1>
                <p>You are registering for resource: {resourceId}</p>

                <form onSubmit={handleRegistration} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={currentUser.displayName || ''}
                            disabled
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={currentUser.email || ''}
                            disabled
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Confirm Registration'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterResource; 