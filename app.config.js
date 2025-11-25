import 'dotenv/config';

/**
 * app.config.js — loads .env.* into expo.extra so runtime code can read them via Constants.
 *
 * This makes FIREBASE_* values available at runtime through Constants.expoConfig.extra
 * which is the recommended way to surface environment variables in Expo-managed apps.
 */
export default ({ config }) => {
  return {
    ...config,
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID
    }
  };
};
