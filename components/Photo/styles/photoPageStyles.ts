import {StyleSheet} from "react-native";

export const photoPageStyles = StyleSheet.create({
    container: {
        zIndex: 5,
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "#000000C8",
        alignItems: "center",
        justifyContent: "center",
    },
    changePictureView: {
        zIndex: 5,
        position: "absolute",
        top: "50%",
        left: 0,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        transform: [{translateY: "-50%"}]
    },
    imgView: {
        width: "100%",
        paddingHorizontal: 20
    },
    mainImg: {
        width: "100%",
       height:400
    },
    arrowImg: {
        width: 50,
        height: 100,
    },
    closeView: {
        zIndex: 5,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-end"
    },
    closeBtn: {
        width: 50,
        height: 50,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    closeText: {
        fontSize: 20,
    },
    dateAndDescriptionText:{
        color:"white"
    },

    descriptionScrollView:{
        flex:1,
        paddingHorizontal:10
    },
    descriptionView:{
        zIndex: 8,
        position: "absolute",
        top: "80%",
        height:"20%",
        left: 0,
        width: "100%",
    }

})
