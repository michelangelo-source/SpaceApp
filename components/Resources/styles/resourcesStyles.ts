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
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 20,
        height: 50,
        marginHorizontal: 20,
    },
    textInputView: {
        width: "80%",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        justifyContent: "center",
        paddingLeft: 20
    },

    submitTouchable: {
        width: '20%',
    },
    submitView: {
        height: "100%",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    loupeStyleImg: {
        height: "100%",
        width: "100%",
    },
    navigationBar: {
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10
    },
    prevTouchable: {
        width: "15%",
    },
    prevButton: {
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    nextTouchable: {
        width: "80%",
    },
    nextButton: {
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    noDataView:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    }
})