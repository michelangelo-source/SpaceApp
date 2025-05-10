import React from "react";
import {ImageBackground, Text, View} from "react-native";
import {Link} from "expo-router";
import {menuElements} from "@/components/Index/texts/IndexTexts";
import {indexStyles} from "@/components/Index/styles/indexStyles";
import {useThemeStyles} from "@/hooks/themeHook";

export default function Index() {
    const themeStyles = useThemeStyles()


    return (
        <View style={indexStyles.container}>
            <ImageBackground source={themeStyles.backgroundImage} resizeMode={"cover"} style={indexStyles.image}>

                {menuElements.map((elem, index) => (
                    <Link href={elem.href} key={index} style={indexStyles.menuElemLLink}>
                        <View style={[themeStyles.containerTheme, indexStyles.menuElemView]}>
                            <Text style={themeStyles.textTheme}>{elem.title}</Text>
                        </View>
                    </Link>
                ))}

            </ImageBackground>
        </View>
    );
}