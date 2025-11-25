# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

---

## Firebase environment (important)

This project reads Firebase credentials from environment variables. Follow these steps to make sure the app gets a valid API key at runtime:

1. Copy the example `.env.local.example` to `.env.local` and fill in the real values from your Firebase project (do not commit `.env.local`).

   ```bash
   cp .env.local.example .env.local
   # then edit .env.local and paste your real project keys
   ```

2. This repository includes `app.config.js` which loads `.env.*` into `expo.extra` at build/start time. Expo exposes these values at runtime through `Constants.expoConfig.extra` — we read those from `firebaseConfig.js` and fall back to `process.env` if needed.

3. After changing `.env.local` you need to restart the dev server (and close/re-open Expo Go if running) for the new values to be picked up.

If you still see `Firebase: invalid api key` after following these steps, double-check that you pasted the correct API key from the Firebase console -> Project settings -> Web API key and that your other `FIREBASE_*` values match the project.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
