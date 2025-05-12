import {StyleSheet} from "react-native";

export const resourcesStyles = StyleSheet.create({
    container: {
        flex: 1,

    },
    titleView: {
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
    },
    titleText: {
        fontSize: 20
    },


    formView: {
        flexDirection: 'row',
        marginBottom:20,
        height:50,
        marginHorizontal:20,
    },
    textInputView:{
        width:"80%",
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,

        borderColor:"black",
        borderWidth: 2,
        borderStyle:"solid",
        borderRightWidth:1,

        justifyContent: "center",
        paddingLeft:20
    },

    submitTouchable: {
        width: '20%',
    },
    submitView: {
        height:"100%",
        borderTopRightRadius:20,
        borderBottomRightRadius:20,

        borderColor:"black",
        borderWidth: 2,
        borderStyle:"solid",
        alignItems: "center",
        justifyContent: "center",
    },

    loupeStyleImg: {
        height: "100%",
        width: "100%",
    }
})