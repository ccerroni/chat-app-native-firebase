// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

// Build Firebase config from environment variables.
// In Expo apps we expose runtime values via Constants.expoConfig.extra (set by app.config.js)
const expoExtra = (Constants?.expoConfig && Constants.expoConfig.extra) || (Constants?.manifest && Constants.manifest.extra) || {};

const getEnv = (key) => {
  // Prefer expo runtime config; fall back to process.env for tooling/build-time values
  return expoExtra?.[key] ?? process.env?.[key] ?? null;
};

const firebaseConfig = {
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('FIREBASE_APP_ID'),
  measurementId: getEnv('FIREBASE_MEASUREMENT_ID')
};

export default firebaseConfig;

// Helpful debug log when keys are missing — this will show a friendly message in dev
if (!firebaseConfig.apiKey) {
   
  console.warn('[firebaseConfig] no apiKey found. Make sure you created a .env.local from .env.local.example and/or provided values in app.config.js (expo.extra)');
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app)
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");