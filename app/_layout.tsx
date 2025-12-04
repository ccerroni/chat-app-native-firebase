
import { AuthContextProvider } from "@/context/authContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { useAuth } from "./hooks/auth/useAuth";
import { MenuProvider} from 'react-native-popup-menu';

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();


  useEffect(() => {
    // check if user is authenticated or not
    if (typeof isAuthenticated == 'undefined') return;
    const inApp = segments[0] === "(app)";

    if (isAuthenticated && !inApp) {
      // redirect to home
      router.replace("/(app)/home");

    }
    else if (!isAuthenticated) {
      router.replace("/signIn");
    }

  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <AuthContextProvider>
          <MainLayout />
        </AuthContextProvider>
      </MenuProvider>
    </SafeAreaProvider>
  );
}
