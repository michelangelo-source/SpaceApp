import {StyleSheet} from "react-native";

export const APODstyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        padding: 10,
        position: 'relative',
    },
    titleView: {
        alignItems: "center",
        justifyContent: "center",
    },

    titleText: {
        fontSize: 20
    },

    chosenDate: {
        margin: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "40%",
        height: 50,
        borderRadius: 5,
    },


    pictureOfTheDay: {
        width: "100%",
        height: 300,
        borderRadius: 5
    },
    credentialsText: {
        fontSize: 15,
        marginTop: 5
    },


    pictureExplanationView: {
        marginTop: 5,
        padding: 10,
        borderRadius: 5,
        marginBottom: 30
    },
    pictureExplanation: {
        textAlign: "justify",
    }

});
