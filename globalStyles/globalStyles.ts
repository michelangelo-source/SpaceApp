import {Dimensions, StyleSheet} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const darkThemeColor = "#222222"
export const darkThemeChildContainer = "#333333"

export const lightThemeColor = "#7fc8cf"
export const lightThemeChildContainer = "#ffffff"

export const globalStyles = StyleSheet.create({

    lightText: {
        color: "#222222"
    },
    darkText: {
        color: "white"
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
    photoListView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    photoListStyle: {
        width: "100%",
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