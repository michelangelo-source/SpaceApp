import {StyleSheet} from "react-native";
export const darkThemeColor="#222222"
export const darkThemeChildContainer="#333333"

export const lightThemeColor="#BDD8F2"
export const lightThemeChildContainer="#91b4dc"

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
})