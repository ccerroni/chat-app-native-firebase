import HomeHeader from "@/components/home-header/homeHeader";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function _layout() {
  return (
    <View className="flex-1">
      <Stack>
        <Stack.Screen 
          name="home" 
          options={{ 
            header: () => <HomeHeader />, 
          }}
           />
      </Stack>
    </View>
  );
}