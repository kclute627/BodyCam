import React, { useState, useRef } from "react";
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
import { styles } from "./styles";
import { Auth } from "aws-amplify";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import logo from "../../../assets/logo3.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignIn({ navigation }) {
  const [formData, setFormData] = useState({
    email: "xekahot556@ketchet.com",
    password: "12345678",
  });
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;
  const signIn = async () => {
    setLoading(true);
    try {
      await Auth.signIn(email, password);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error);
    }
    setLoading(false);
  };

  const passwordRef = useRef(null);
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
        <View style={styles.inputView}>
          <MaterialCommunityIcons
            name="email-outline"
            color="white"
            size={30}
            style={styles.icon}
          />
          <TextInput
            style={styles.signInInput}
            autoCompleteType="email"
            value={email}
            keyboardType="email-address"
            placeholder="email"
            placeholderTextColor={"gray"}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            onChangeText={(value) => {
              setFormData({ ...formData, email: value });
            }}
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
            style={styles.signInInput}
            autoCompleteType="password"
            secureTextEntry={true}
            value={password}
            placeholder="password"
            placeholderTextColor={"gray"}
            onChangeText={(value) => {
              setFormData({ ...formData, password: value });
            }}
            returnKeyType="done"
            ref={passwordRef}
          />
        </View>
        <Pressable
          style={styles.passwordLink}
          onPress={() => {
            navigation.navigate("Forgot");
          }}
        >
          <Text style={styles.passwordLinkText}>Forgot you password?</Text>
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
