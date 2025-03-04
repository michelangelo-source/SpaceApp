import {Stack} from "expo-router";
import {StatusBar} from "react-native";
import React from "react";

export default function RootLayout() {

  return (
  <>
      <StatusBar
          animated={true}
          backgroundColor="black"
          barStyle={"light-content"}
          showHideTransition={'slide'}
          hidden={false}
      />
      <Stack screenOptions={{headerShown: false}}/>
</>



  )
}
