import {Stack} from "expo-router";
import {StatusBar} from "react-native";
import React, {useEffect} from "react";
import * as ScreenOrientation from "expo-screen-orientation";

export default function RootLayout() {
    useEffect(() => {
        const unlockOrientation = async () => {
            await ScreenOrientation.unlockAsync()
        }
        unlockOrientation().then()
    }, [])
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
