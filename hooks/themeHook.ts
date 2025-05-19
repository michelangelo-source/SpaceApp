import {useColorScheme} from "react-native";
import {globalStyles} from "@/globalStyles/globalStyles";

export const useThemeStyles=()=>{
    const colorScheme = useColorScheme();
    if(colorScheme==='light'){
        return{
            textTheme:globalStyles.lightText,
            containerTheme:globalStyles.lightContainer,
            childContainerTheme:globalStyles.childColorLight,
            backgroundImage:require('@/assets/images/lightBackground.png'),
            thirdColor:globalStyles.thirdLightThemeColor,
            border:globalStyles.borderLight,
        }
    }else {
        return{
            textTheme:globalStyles.darkText,
            containerTheme:globalStyles.darkContainer,
            childContainerTheme:globalStyles.childColorDark,
            backgroundImage:require('@/assets/images/darkBackgorund.png'),
            thirdColor:globalStyles.thirdDarkThemeColor,
            border:globalStyles.borderDark,
        }
    }
};