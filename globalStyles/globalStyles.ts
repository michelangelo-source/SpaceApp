import {Dimensions, StyleSheet} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const darkThemeColor = "#222222"
export const darkThemeChildContainer = "#333333"
export const darkThemeThirdColor = "#111111"
export const darkTextColor = "white"

export const lightThemeColor = "#f4f4f4"
export const lightThemeChildContainer = "#ffffff"
export const lightThemeThirdColor = "#6e9cbd"
export const lightTextColor = "#2C3E50"

export const globalStyles = StyleSheet.create({

    lightText: {
        color: lightTextColor
    },
    darkText: {
        color:darkTextColor
    },
    lightContainer: {
        backgroundColor: lightThemeColor
    },
    darkContainer: {
        backgroundColor: darkThemeColor
    },
    childColorLight: {
        backgroundColor: lightThemeChildContainer,
    },
    childColorDark: {
        backgroundColor: darkThemeChildContainer,
    },
    thirdLightThemeColor:{
        backgroundColor:lightThemeThirdColor
    },
    thirdDarkThemeColor:{
        backgroundColor:darkThemeThirdColor
    },
    photoListView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    photoListStyle: {
        width: "100%",
    },
    backgroundImage: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    photoViewPortrait: {
        width: windowWidth / 3,
        height: windowWidth / 3,
        padding: 5
    },
    photoImgPortrait: {
        width: windowWidth / 3 - 10,
        height: windowWidth / 3 - 10,
    },
    photoViewLandscape: {
        width: windowHeight / 6,
        height: windowHeight / 6,
        padding: 5
    },
    photoImgLandscape: {
        width: windowHeight / 6 - 10,
        height: windowHeight / 6 - 10,
    }
})