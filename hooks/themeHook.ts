import {useColorScheme} from "react-native";
import {globalStyles} from "@/globalStyles/globalStyles";

export const useThemeStyles=()=>{
    const colorScheme = useColorScheme();

    const themeBackgroundImage =
        colorScheme === 'light' ? require('@/assets/images/lightBackground.png') : require('@/assets/images/darkBackgorund.png')
    const themeTextStyle =
        colorScheme === 'light' ? globalStyles.lightText : globalStyles.darkText;
    const themeContainerStyle =
        colorScheme === 'light' ? globalStyles.lightContainer : globalStyles.darkContainer;
    const themeChildContainerStyle =
        colorScheme === 'light' ? globalStyles.childColorLight : globalStyles.childColorDark;
    const themeThirdColor =
        colorScheme === 'light' ? globalStyles.thirdLightThemeColor : globalStyles.thirdDarkThemeColor
    return{
        textTheme:themeTextStyle,
        containerTheme:themeContainerStyle,
        childContainerTheme:themeChildContainerStyle,
        backgroundImage:themeBackgroundImage,
        thirdColor:themeThirdColor,
    }
};