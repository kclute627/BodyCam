import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import Expo from "expo";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { styles } from "./styles";
import { InputView } from "../../utils/Helpers";
import { Auth } from "aws-amplify";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import logo from "../../../assets/logo3.png";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignIn({ navigation }) {
  const [formData, setFormData] = useState({
    email: "bju13713@boofx.com",
    password: "12345678",
  });
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;
  useEffect(() => {
    return () => {};
  }, []);
  const signIn = useCallback(async () => {
    setLoading(true);
    try {
      await Auth.signIn(email, password);
    } catch (error) {
      ///handle the unconfirmed user
      if (error.code === "UserNotConfirmedException") {
        navigation.navigate("SignUp", { username: email });
      } else {
        Alert.alert("Error!", error.message || "An error has occured");
      }
    }
    setLoading(false);
  }, []);

  const passwordRef = useRef(null);

  const googleSignIn = async()=> {
    try {
      
      Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})
      
    } catch (error) {
      Alert.alert("Error!", error.message || "An error has occured");
      
    }
  }
  //TODO

  //Handle unconfirmedusername
  //Handle log in with apple and google

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#4c69a5" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <View style={styles.logoView}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.headerView}>
        <Text style={styles.header}>Welcome Back</Text>
        <Text style={styles.subHeader}>Please Sign In</Text>
      </View>
      <View style={styles.signInView}>
        <InputView
          icon="email-outline"
          autoCompleteType="email"
          placeholder="Email"
          returnKeyType="next"
          value={email}
          refs={passwordRef}
          setFormData={setFormData}
          formData={formData}
          title="email"
          padding={false}
          secureTextEntry={false}
        />
        <InputView
          icon="lock-outline"
          autoCompleteType="password"
          placeholder="Password"
          returnKeyType="done"
          value={password}
          refs={null}
          setFormData={setFormData}
          formData={formData}
          title="password"
          padding={true}
          secureTextEntry={true}
        />


        <Pressable
          style={styles.passwordLink}
          onPress={() => {
            navigation.navigate("Forgot");
          }}
        >
          <Text style={styles.passwordLinkText}>Forgot you password?</Text>
        </Pressable>
        <Pressable onPress={googleSignIn}>
          <Text>Sign in With Google</Text>
        </Pressable>
        <View style={styles.btnView}>
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.3 : 1 },
              styles.signinBtn,
            ]}
            onPress={signIn}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.btnText}>SIGN IN</Text>
            )}
          </Pressable>
          <View style={styles.regView}>
            <Text style={styles.regText}>Dont Have An Account?</Text>
            <Pressable
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.regText2}>Register</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
