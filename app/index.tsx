import React from "react";
import {ImageBackground, Text, useColorScheme, View} from "react-native";
import {Link} from "expo-router";
import {menuElements} from "@/components/Index/texts/IndexTexts";
import {indexStyles} from "@/components/Index/styles/indexStyles";
import {globalStyles} from "@/globalStyles/globalStyles";

export default function Index() {
    const colorScheme = useColorScheme();
    const lightBackground = require('@/assets/images/lightBackground.png')
    const darkBackground = require('@/assets/images/darkBackgorund.png')
    const themeBackgroundImage = colorScheme === 'light' ? lightBackground : darkBackground
    const themeTextStyle =
        colorScheme === 'light' ? globalStyles.lightText : globalStyles.darkText;
    const themeBackgroundStyle =
        colorScheme === 'light' ? indexStyles.lightMenuElem : indexStyles.darkMenuElem;

    return (
        <View style={indexStyles.container}>
            <ImageBackground source={themeBackgroundImage} resizeMode={"cover"} style={indexStyles.image}>

                    {menuElements.map((elem, index) => (
                        <Link href={elem.href} key={index} style={indexStyles.menuElemLLink}>
                            <View style={[indexStyles.menuElemView, themeBackgroundStyle]}>
                                <Text style={themeTextStyle}>{elem.title}</Text>
                            </View>
                        </Link>
                    ))}

            </ImageBackground>
        </View>
    );
}