import {Stack} from "expo-router";
import {StatusBar} from "react-native";
import React, {useEffect} from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import * as NavigationBar from 'expo-navigation-bar';
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
export default function RootLayout() {
    const queryClient = new QueryClient()
    useEffect(() => {
        const unlockOrientation = async () => {
            await ScreenOrientation.unlockAsync()
            await NavigationBar.setBehaviorAsync('overlay-swipe')
            await NavigationBar.setVisibilityAsync("hidden");
        }
        unlockOrientation().then()
    }, [])
    return (
        <QueryClientProvider client={queryClient}>

            <StatusBar
                animated={true}
                backgroundColor="black"
                barStyle={"light-content"}
                showHideTransition={'slide'}
                hidden={false}
            />
            <Stack screenOptions={{headerShown: false}}/>

        </QueryClientProvider>


    )
}
