import CustomKeyboardView from "@/components/customKeyboardView";
import Loading from "@/components/loading";
import Feather from "@expo/vector-icons/Feather";
import Outicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useAuth } from "./hooks/auth/useAuth";

export default function SignUp() {
  const router = useRouter();
  const {register} = useAuth(); 
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");



  const handleSignUp = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert("Sign UP", "Please fill all fields");
      return;
    }
    setLoading(true);
    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current);
    setLoading(false);

    if(!response.success){
      Alert.alert("Sign Up", response.msg || "Error creating account");
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style='dark' />
      <View
        className='flex-1 gap-10'
        style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
      >
        <View className='items-center'>
          {/* signin image */}
          <Image
            source={require("../assets/images/register.png")}
            style={{ height: hp(20), resizeMode: "contain" }}
          />
        </View>
        <Text
          style={{ fontSize: hp(4) }}
          className='font-bold tracking-wider text-center text-neutral-800 mb-4'
        >
          Sign Up
        </Text>

        {/* inputs */}
        <View className='gap-4'>
          <View
            style={{ height: hp(7) }}
            className='flex-row gap-4 px-4 bg-neutral-100 rounded-xl items-center'
          >
            <Feather name='user' size={hp(2.7)} color='gray' />
            <TextInput
              onChange={(e) => (usernameRef.current = e.nativeEvent.text)}
              style={{ fontSize: hp(2) }}
              className='flex-1 font-semibold text-neutral-700'
              placeholder='Username'
              placeholderTextColor='gray'
            />
          </View>
          <View
            style={{ height: hp(7) }}
            className='flex-row gap-4 px-4 bg-neutral-100 rounded-xl items-center'
          >
            <Outicons name='mail' size={hp(2.7)} color='gray' />
            <TextInput
              onChange={(e) => (emailRef.current = e.nativeEvent.text)}
              style={{ fontSize: hp(2) }}
              className='flex-1 font-semibold text-neutral-700'
              placeholder='Email'
              placeholderTextColor='gray'
            />
          </View>
          <View
            style={{ height: hp(7) }}
            className='flex-row gap-4 px-4 bg-neutral-100 rounded-xl items-center'
          >
            <Outicons name='lock' size={hp(2.7)} color='gray' />
            <TextInput
              onChange={(e) => (passwordRef.current = e.nativeEvent.text)}
              style={{ fontSize: hp(2) }}
              secureTextEntry
              className='flex-1 font-semibold text-neutral-700'
              placeholder='Password'
              placeholderTextColor='gray'
            />
          </View>

           <View
            style={{ height: hp(7) }}
            className='flex-row gap-4 px-4 bg-neutral-100 rounded-xl items-center'
          >
            <Feather name='image' size={hp(2.7)} color='gray' />
            <TextInput
              onChange={(e) => (profileRef.current = e.nativeEvent.text)}
              style={{ fontSize: hp(2) }}
              className='flex-1 font-semibold text-neutral-700'
              placeholder='Profile url'
              placeholderTextColor='gray'
            />
          </View>

          <View>
            {loading ? (
              <View className='flex-row justify-center'>
                <Loading size={hp(6.5)} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleSignUp}
                className='bg-indigo-500 px-4 py-2 rounded-xl'
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className=' font-semibold text-center text-white'
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View className='flex-row justify-center items-center gap-1'>
            <Text
              style={{ fontSize: hp(1.8) }}
              className='font-semibold text-neutral-500'
            >
              Already have an account?
            </Text>
            <Pressable onPress={() => router.push("/signIn")}>
              <Text className='font-bold text-indigo-500'>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
