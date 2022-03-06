import React from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./src/Navigation";
import Amplify from "aws-amplify";

import { AuthProvider } from "./src/context/Auth.Provider";
import {InAppBrowser}  from 'react-native-inappbrowser-reborn'
import awsconfig from "./src/aws-exports";

async function urlOpener() {
  try {
    await InAppBrowser.isAvailable()

  const { type, url: newUrl} = InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false
  })

  if(type === 'success'){
    Linking.openURL(newUrl)
  }
    
  } catch (error) {
    console.log(error)
  }
  
  
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener
  }
});

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </AuthProvider>
  );
}
