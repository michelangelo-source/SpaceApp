import React, {useEffect, useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {photoPageStyles} from "@/components/Photo/styles/photoPageStyles";
import {photoByEarthDate} from "@/components/MarsRoverPhotos/api/photosByEarthDate";
import {photoTexts} from "@/components/Photo/text/PhotoTexts";
import {useThemeStyles} from "@/hooks/themeHook";
import {resourcesPhoto} from "@/app/resources";

interface PhotoProps {
    close: () => void
}

interface SwappablePageProps extends PhotoProps {
    swappable: true;
    photos: photoByEarthDate[]|resourcesPhoto[]
    index: number
}

interface NonSwappablePageProps extends PhotoProps {
    swappable: false;
    src: string;
}

type PhotoPageProps = SwappablePageProps | NonSwappablePageProps

export const PhotoPage = (props: PhotoPageProps) => {
    const [photoIndex, setPhotoIndex] = useState(0);
    useEffect(() => {
        if (props.swappable) {
            setPhotoIndex(props.index);
        }
    }, [])
    const themeStyles = useThemeStyles();

    return (
        <View style={photoPageStyles.container}>
            <View style={photoPageStyles.imgView}>
                <Image source={{
                    uri: props.swappable ? props.photos[photoIndex].img_src : props.src
                }}
                       resizeMode={"contain"}
                       style={photoPageStyles.mainImg}
                />
            </View>
            <View style={[photoPageStyles.closeView]}>
                <TouchableOpacity onPress={props.close}>
                    <View style={[themeStyles.childContainerTheme, photoPageStyles.closeBtn]}>
                        <Text style={[themeStyles.textTheme, photoPageStyles.closeText]}>{photoTexts.close}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {props.swappable &&
                <View style={photoPageStyles.changePictureView}>
                    <View>
                        {photoIndex > 0 &&
                            <TouchableOpacity onPress={() => {
                                setPhotoIndex(photoIndex - 1)
                            }}>
                                <Image source={require('@/assets/images/leftArrow.png')}
                                       resizeMode={"cover"}
                                       style={photoPageStyles.arrowImg}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                    {photoIndex < props.photos.length - 1 &&
                        <TouchableOpacity onPress={() => {
                            setPhotoIndex(photoIndex + 1)
                        }}>
                            <Image source={
                                require('@/assets/images/rightArrow.png')
                            }
                                   resizeMode={"cover"}
                                   style={photoPageStyles.arrowImg}
                            />
                        </TouchableOpacity>
                    }
                </View>
            }
        </View>
    )
}