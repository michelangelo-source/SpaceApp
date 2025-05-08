import {StyleSheet} from "react-native";

export const photoPageStyles =StyleSheet.create({

    container: {
        zIndex: 5,
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        opacity:0.8,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    img:{
        width: "100%",
        height: "100%",
    },
    closeView:{
        backgroundColor:"blue",
        width:200,
        height:100,
    },
    closeText:{
        fontSize:20,
        color:"white",
    }
})
