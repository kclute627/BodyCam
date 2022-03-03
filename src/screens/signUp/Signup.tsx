import React, { useState, useRef, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import OTPInput from "@twotalltotems/react-native-otp-input";
import { Auth } from "aws-amplify";
import { useHeaderHeight } from "@react-navigation/elements";
import { styles } from "../signIn/styles";
import logo from "../../../assets/logo3.png";
import { colors } from "../../constants/theme";

export default function Signup({ navigation, route }) {
  const [formData, setFormData] = useState({
    email: "bju13713@boofx.com",
    password: "12345678",
    confirmPassword: "",
    name: "Kyle C",
  });
  const [loading, setLoading] = useState(false);
  //TODO
  // change password
  // forgot password
  // google log in 
  // apple log in 
  const unconfirmedUsername = route.params?.username;
  const [step, setStep] = useState<"signUp" | "code">(
    unconfirmedUsername ? "code" : "signUp"
  );
  const [resending, setResending] = useState(false);

  const passwordRef = useRef(null);

  const emailRef = useRef(null);
  const confirmPasswordRef = useRef(null);


  const { name, email, password, confirmPassword } = formData;

  useEffect(() => {
    if (unconfirmedUsername) {
      resendCode(unconfirmedUsername);
    }
  }, []);

  const signUp = async () => {
    setLoading(true);
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name,
        },
      });

      setStep("code");
    } catch (error) {
      Alert.alert("Error!", error.message || "An error has occurred!");
    }
    setLoading(false);
  };

  const confirmCode = async (code: string) => {
    setLoading(true);
    try {
      const data = await Auth.confirmSignUp(email, code);
      await Auth.signIn(email, password);
    } catch (error) {
      Alert.alert("Error!", error.message || "An error has occurred!");
    }
    setLoading(false);
  };
  const resendCode = async (emailAddress: string) => {
    setResending(true);
    try {
      await Auth.resendSignUp(emailAddress);
    } catch (error) {
      Alert.alert("Error!", error.message || "An error has occurred!");
    }
    setResending(false);
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#4c69a5" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <ScrollView contentContainerStyle={styles.container2}>
        <View style={styles.logoView}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.headerView}>
          <Text style={styles.header}>Welcome</Text>
          <Text style={styles.subHeader}>Please Register</Text>
        </View>

        {step === "code" && (
          <>
            <Text style={[styles.codeText, styles.center]}>
              Enter the code that you received via email
            </Text>

            {loading ? (
              <ActivityIndicator />
            ) : (
              <View style={styles.code}>
                <OTPInput
                  placeholderCharacter="0"
                  pinCount={6}
                  codeInputFieldStyle={styles.otpInputBox}
                  codeInputHighlightStyle={styles.otpActive}
                  selectionColor={colors.white}
                  onCodeFilled={(code) => {
                    confirmCode(code);
                  }}
                />
                <Pressable
                  style={({ pressed }) => [
                    { opacity: pressed ? 0.3 : 1 },
                    styles.resendView,
                  ]}
                  onPress={() => resendCode(email)}
                >
                  {resending ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.resendText}>Resend Code</Text>
                  )}
                </Pressable>
              </View>
            )}
          </>
        )}
        {step === "signUp" && (
          <View style={styles.signInView}>
            <View style={styles.inputView}>
              <MaterialCommunityIcons
                name="account-outline"
                color="white"
                size={30}
                style={styles.icon}
              />
              <TextInput
                style={styles.signInInput}
                autoCompleteType="name"
                keyboardType="default"
                placeholder="Name"
                placeholderTextColor={"gray"}
                returnKeyType="next"
                value={name}
                onSubmitEditing={() => {
                  emailRef.current?.focus();
                }}
                onChangeText={(value) => {
                  setFormData({ ...formData, name: value });
                }}
              />
            </View>
            <View style={[styles.inputView, { paddingTop: 35 }]}>
              <MaterialCommunityIcons
                name="email-outline"
                color="white"
                size={30}
                style={styles.icon}
              />
              <TextInput
                style={styles.signInInput}
                autoCompleteType="email"
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor={"gray"}
                returnKeyType="next"
                value={email}
                ref={emailRef}
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
                onChangeText={(value) => {
                  setFormData({ ...formData, email: value });
                }}
              />
            </View>
            <View style={[styles.inputView, { paddingTop: 35 }]}>
              <MaterialCommunityIcons
                name="lock-outline"
                color="white"
                size={30}
                style={styles.icon}
              />
              <TextInput
                style={styles.signInInput}
                autoCompleteType="password"
                value={password}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor={"gray"}
                onChangeText={(value) => {
                  setFormData({ ...formData, password: value });
                }}
                onSubmitEditing={() => {
                  confirmPasswordRef.current?.focus();
                }}
                returnKeyType="next"
                ref={passwordRef}
              />
            </View>
            <View style={[styles.inputView, { marginTop: 35 }]}>
              <MaterialCommunityIcons
                name="lock-outline"
                color="white"
                size={30}
                style={styles.icon}
              />
              <TextInput
                style={
                  confirmPassword.length > 1 && confirmPassword !== password
                    ? [styles.signInInput, { borderBottomColor: "red" }]
                    : confirmPassword.length > 2 && confirmPassword === password
                    ? [styles.signInInput, { borderBottomColor: "green" }]
                    : [styles.signInInput, { borderBottomColor: "white" }]
                }
                autoCompleteType="password"
                secureTextEntry={true}
                value={confirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor={"gray"}
                onChangeText={(value) => {
                  setFormData({ ...formData, confirmPassword: value });
                }}
                returnKeyType="done"
                ref={confirmPasswordRef}
              />
            </View>

            <View style={styles.btnView}>
              <Pressable
                style={({ pressed }) => [
                  { opacity: pressed ? 0.3 : 1 },
                  styles.signinBtn,
                ]}
                onPress={signUp}
              >
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.btnText}>Register</Text>
                )}
              </Pressable>
              <View style={styles.regView}>
                <Text style={styles.regText}>Already Have An Account?</Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate("SignIn");
                  }}
                >
                  <Text style={styles.regText2}>Sign In</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
