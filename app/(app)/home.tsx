import { Pressable, Text, View } from "react-native";
import { useAuth } from "../hooks/auth/useAuth";

export default function Home() {
  const {logout, user} = useAuth();
  const handleLogout = async () => {
    await logout();
  }
 console.log("USER DATA:", user);
  return (
    <View className="flex-1 bg-white">
      <Text>Home(app) {user?.username}</Text>
      <Pressable onPress={handleLogout}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>)
}