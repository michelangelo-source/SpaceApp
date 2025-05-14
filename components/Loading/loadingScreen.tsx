import {Text, View} from "react-native";
import {loadingTexts} from "@/components/Loading/texts/loadingTexts";
import {loadingStyles} from "@/components/Loading/styles/loadingStyles";
import {useThemeStyles} from "@/hooks/themeHook";

export const LoadingScreen=()=> {
    const themeStyles = useThemeStyles()
    return (
        <View style={[themeStyles.containerTheme,loadingStyles.container]}>
            <Text style={[themeStyles.textTheme]}>{loadingTexts.loading}</Text>
        </View>
    )
}