import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {photoPageStyles} from "@/components/Photo/styles/photoPageStyles";
import {photoByEarthDate} from "@/components/MarsRoverPhotos/api/photosByEarthDate";

interface PhotoProps {
    close: () => void
}

interface SwappablePageProps extends PhotoProps {
    swappable: true;
    photos: photoByEarthDate[]
    index: number

}

interface NonSwappablePageProps extends PhotoProps {
    swappable: false;
    src: string;
}

type PhotoPageProps = SwappablePageProps | NonSwappablePageProps

export const PhotoPage = (props: PhotoPageProps) => {
    return (
        <View style={photoPageStyles.container}>
            <Image source={{
                uri: props.swappable ? props.photos[props.index].img_src : props.src
            }}

                   style={photoPageStyles.img} resizeMode={"contain"}/>

            <TouchableOpacity onPress={props.close}>
                <View style={photoPageStyles.closeView}>

                    <Text style={photoPageStyles.closeText}>Close</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}