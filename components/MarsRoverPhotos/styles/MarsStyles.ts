import {Dimensions, StyleSheet} from "react-native";
const windowWidth = Dimensions.get('window').width;
export const marsStyles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: "center",
       justifyContent: "center",
   },
    title:{
       marginTop:20,
        fontSize: 20
    },
   dateBtn:{
       margin: 20,
       alignItems: "center",
       justifyContent: "center",
       width: "40%",
       height: 50,
       borderRadius: 5,
   },
    photoListStyle:{
        width: "100%"
    },
    photoView:{
        width: windowWidth / 3,
        height: windowWidth / 3,
        padding: 5
    },
    photoImg:{
        width: windowWidth / 3-10,
        height: windowWidth / 3-10,
    }
})