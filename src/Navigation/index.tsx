import React from "react";
import { View, Text } from "react-native";
import { AuthProvider } from "../context/Auth.Provider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navTypes";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import { useAuthContext } from "../context/Auth.Provider";
import SignIn from "../screens/signIn/SignIn";
import Signup from "../screens/signUp/Signup";
import ForgotPassword from "../screens/forgotPassword/ForgotPassword";

export default function index() {
  const { user } = useAuthContext();

  const Stack = createNativeStackNavigator<RootStackParamList>();

  // protected routes

  function RootNavigator() {
    const isSignedIn = (
      <>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </>
    );
    const notSignedIn = (
      <>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
      </>
    );

    return <Stack.Navigator>{user ? isSignedIn : notSignedIn}</Stack.Navigator>;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
