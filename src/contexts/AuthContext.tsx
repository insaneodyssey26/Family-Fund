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

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, displayName: string) => Promise<void>;
    logout: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function signup(email: string, password: string, displayName: string) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: displayName
        });
        setCurrentUser({ ...userCredential.user, displayName });
    }

    async function login(email: string, password: string) {
        await signInWithEmailAndPassword(auth, email, password);
    }

    async function logout() {
        await signOut(auth);
    }

    async function signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            // Add additional scopes if needed
            provider.addScope('profile');
            provider.addScope('email');

            const result = await signInWithPopup(auth, provider);
            // The signed-in user info is automatically updated in the state
            // through the onAuthStateChanged listener
            return result.user;
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

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
} 