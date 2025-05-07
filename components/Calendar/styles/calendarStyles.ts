import {StyleSheet} from "react-native";
import {
    darkThemeChildContainer,
    darkThemeColor,
    lightThemeChildContainer,
    lightThemeColor
} from "@/globalStyles/globalStyles";

export const calendarStyles = StyleSheet.create({
    container: {
        zIndex: 5,
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",

        alignItems: "center",
        justifyContent: "center",
    },
    mainCalendar: {
        borderWidth: 1,
        padding: 10,
        height: 400,
        width: 270,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    mainCalendarDark: {
        borderColor: darkThemeColor,
        backgroundColor: darkThemeChildContainer
    },
    mainCalendarLight: {
        borderColor: lightThemeColor,
        backgroundColor: lightThemeChildContainer
    },



})