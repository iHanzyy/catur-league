// Firebase Admin SDK configuration
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY 
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Validate required environment variables
if (!firebaseAdminConfig.projectId) {
  throw new Error('FIREBASE_PROJECT_ID is required');
}
if (!firebaseAdminConfig.privateKey) {
  throw new Error('FIREBASE_PRIVATE_KEY is required');
}
if (!firebaseAdminConfig.clientEmail) {
  throw new Error('FIREBASE_CLIENT_EMAIL is required');
}

// Initialize app only if it hasn't been initialized
let app;
if (!getApps().length) {
  try {
    app = initializeApp({
      credential: cert(firebaseAdminConfig),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
} else {
  app = getApps()[0];
}

// Initialize Firestore
export const db = getFirestore(app);
export default app;
