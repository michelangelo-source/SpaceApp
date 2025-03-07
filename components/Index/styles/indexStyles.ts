import {StyleSheet} from "react-native";
import {darkThemeColor, lightThemeColor} from "@/globalStyles/globalStyles";

export const indexStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    link:{
        width: "100%",
    },
    menuElem:{
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        width: "80%",
        height:60,
        padding:5,
        opacity:0.8,
        borderRadius:15,
        margin:5
    },
    lightMenuElem:{
        backgroundColor:lightThemeColor
    },
    darkMenuElem:{
        backgroundColor:darkThemeColor
    }
})