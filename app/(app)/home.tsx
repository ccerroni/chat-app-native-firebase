import { Pressable, Text, View } from "react-native";
import { useAuth } from "../hooks/auth/useAuth";

export default function Home() {
  const {logout} = useAuth();
  const handleLogout = async () => {
    await logout();
  }

  return (
    <View className="flex-1">
      <Text>Home(app)</Text>
      <Pressable onPress={handleLogout}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>)
}