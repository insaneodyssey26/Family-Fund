import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface ContactMessage {
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
    status: 'pending' | 'read' | 'replied';
}

export const contactService = {
    async sendMessage(message: Omit<ContactMessage, 'createdAt' | 'status'>): Promise<void> {
        try {
            await addDoc(collection(db, 'contactMessages'), {
                ...message,
                createdAt: Timestamp.now(),
                status: 'pending'
            });
        } catch (error) {
            console.error('Error sending message:', error);
            throw new Error('Failed to send message. Please try again later.');
        }
    }
}; 