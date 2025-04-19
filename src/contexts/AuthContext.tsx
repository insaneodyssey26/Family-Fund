import { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, displayName: string) => Promise<void>;
    logout: () => Promise<void>;
    signInWithGoogle: () => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('Auth state changed:', user ? 'User logged in' : 'No user');
            setCurrentUser(user);
            setLoading(false);
        }, (error) => {
            console.error('Auth state change error:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signup = async (email: string, password: string, displayName: string) => {
        try {
            console.log('Attempting signup...');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: displayName
            });
            console.log('Signup successful:', userCredential.user);
            setCurrentUser({ ...userCredential.user, displayName });

            // Navigate to home page after successful signup
            navigate('/');
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            console.log('Attempting login...');
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful:', result.user);
            setCurrentUser(result.user);

            // Navigate to the previous page or home
            const origin = location.state?.from?.pathname || '/';
            navigate(origin);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            console.log('Attempting logout...');
            await signOut(auth);
            console.log('Logout successful');
            setCurrentUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            const result = await signInWithPopup(auth, provider);
            setCurrentUser(result.user);

            // Navigate to the previous page or home
            const origin = location.state?.from?.pathname || '/';
            navigate(origin);
            return result.user;
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    };

    const value = {
        currentUser,
        loading,
        login,
        signup,
        logout,
        signInWithGoogle
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};