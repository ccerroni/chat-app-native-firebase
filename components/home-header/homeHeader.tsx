import React from "react";
import { Alert, Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "@/utils/common";
import { useAuth } from "@/app/hooks/auth/useAuth";
import {
  Menu,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import CustomMenuItem from "../custom-menu-items/custom-menu-item";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const ios = Platform.OS === "ios";

export default function HomeHeader() {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();

  const handleProfile = () => {
    Alert.alert("Profile", "Profile clicked");
  }

  const handleSignOut = async () => {
    await logout();
  }


  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className='flex-row justify-between px-5 pb-5 bg-indigo-400 rounded-b-3xl shadow-md shadow-sm'
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className='font-medium text-white'>
          Chats
        </Text>
      </View>

      <View>
        <Menu>
          <MenuTrigger customStyles={{
            triggerWrapper: {

            }
          }}>
            <Image
              source={{
                uri:
                  user?.profileUrl ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
              }}
              style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
              transition={500}
              placeholder={blurhash}
            />
          </MenuTrigger>
          <MenuOptions customStyles={{
            optionsContainer: {
              borderRadius: 10,
              borderCurve: 'continuous',
              marginTop: 40,
              marginLeft: -30,
              backgroundColor: 'white', 
              shadowOpacity: 0.2,
              shadowOffset: {width: 0, height: 0},
              width: 160,              
            }
          }}>
            <CustomMenuItem 
              text="Profile" 
              action={handleProfile} 
              value={null} 
              icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
              />
            <CustomMenuItem 
              text="Sign Out" 
              action={handleSignOut} 
              value={null} 
              icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" />} />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}
