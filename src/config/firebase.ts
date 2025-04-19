import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBzNAyUgGiEd6nnBn6-bu4hZHStVfAMkqM",
    authDomain: "family-fund-2605.firebaseapp.com",
    projectId: "family-fund-2605",
    storageBucket: "family-fund-2605.firebasestorage.app",
    messagingSenderId: "827375343717",
    appId: "1:827375343717:web:7a14fc9d07dba881430e8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 