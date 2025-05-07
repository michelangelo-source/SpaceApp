import {StyleSheet} from "react-native";
export const darkThemeColor="#222222"
export const darkThemeChildContainer="#333333"

export const lightThemeColor="#7fc8cf"
export const lightThemeChildContainer="#ffffff"

export const globalStyles = StyleSheet.create({

    lightText:{
        color:"#222222"
    },
    darkText:{
        color:"white"
    },
    lightContainer:{
        backgroundColor:lightThemeColor
    },
    darkContainer:{
        backgroundColor:darkThemeColor
    },
    childColorLight: {
        backgroundColor: lightThemeChildContainer,
    },
    childColorDark: {
        backgroundColor: darkThemeChildContainer,
    },
})