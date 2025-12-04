import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { MenuOption } from "react-native-popup-menu";
import { View, Text } from "react-native";

interface CustomMenuItemProps {
  text: string;
  action: (value: unknown) => void;
  value: unknown;
  icon: React.ReactNode;
}

export default function CustomMenuItem({
  text,
  action,
  value,
  icon,
}: CustomMenuItemProps) {
  return <MenuOption onSelect={() => action(value)}>
    <View className="px-4 py-4 flex-row justify-between items-center">
      <Text style={{ fontSize: hp(1.7) }} className="font-semibold text-neutral-500">{text}</Text>
      {icon}
    </View>
  </MenuOption>;
}
