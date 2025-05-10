import {Dimensions, StyleSheet} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const marsStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        marginTop: 20,
        fontSize: 20
    },
    dateBtn: {
        margin: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "40%",
        height: 50,
        borderRadius: 5,
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