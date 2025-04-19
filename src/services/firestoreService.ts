import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Transaction {
    id?: string;
    amount: number;
    description: string;
    type: 'income' | 'expense';
    category: string;
    date: Date;
    userId: string;
}

export const firestoreService = {
    // Add a new transaction
    async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<string> {
        const docRef = await addDoc(collection(db, 'transactions'), {
            ...transaction,
            date: Timestamp.fromDate(transaction.date)
        });
        return docRef.id;
    },

    // Get all transactions for a user
    async getTransactions(userId: string): Promise<Transaction[]> {
        const q = query(
            collection(db, 'transactions'),
            where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date.toDate()
        })) as Transaction[];
    },

    // Update a transaction
    async updateTransaction(id: string, transaction: Partial<Transaction>): Promise<void> {
        const docRef = doc(db, 'transactions', id);
        await updateDoc(docRef, {
            ...transaction,
            date: transaction.date ? Timestamp.fromDate(transaction.date) : undefined
        });
    },

    // Delete a transaction
    async deleteTransaction(id: string): Promise<void> {
        const docRef = doc(db, 'transactions', id);
        await deleteDoc(docRef);
    }
}; 