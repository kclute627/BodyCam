import React from "react";
import {Auth} from 'aws-amplify'
import { View, Text, SafeAreaView, Pressable } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { styles } from "./Styles";

import background from '../../../assets/background.mp4';

export default function HomeScreen() {

  /// make this a context function 
  const signOut = async()=>{
    try {
      await Auth.signOut()
      
    } catch (error) {
      
    }
  }
  return (
    <SafeAreaView style={styles.container}>
     
      <Text>HOME</Text>
      <Pressable onPress={signOut}>
        <Text>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}
