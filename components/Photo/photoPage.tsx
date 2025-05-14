import React, {useEffect, useState} from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {photoPageStyles} from "@/components/Photo/styles/photoPageStyles";
import {photoTexts} from "@/components/Photo/text/PhotoTexts";
import {useThemeStyles} from "@/hooks/themeHook";
import {UnifiedPhoto} from "@/components/Gallery/gallery";

interface PhotoProps {
    close: () => void

}

interface SwappablePageProps extends PhotoProps {
    swappable: true;
    photos: UnifiedPhoto[]
    index: number
    showDate: boolean
    showDescription: boolean
}

interface NonSwappablePageProps extends PhotoProps {
    swappable: false;
    src: string;
}

type PhotoPageProps = SwappablePageProps | NonSwappablePageProps

export const PhotoPage = (props: PhotoPageProps) => {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [hiddenDescription, setHiddenDescription] = useState<boolean>(true);
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

            {props.swappable && props.showDate &&
                <Text style={photoPageStyles.dateAndDescriptionText}>{
                    new Date(props.photos[photoIndex].date_created).toLocaleDateString()
                }</Text>
            }
            {props.swappable && props.showDescription &&
                <View style={photoPageStyles.descriptionView}>
                    <TouchableOpacity onPress={()=>setHiddenDescription(!hiddenDescription)}>
                       <Text style={[photoPageStyles.dateAndDescriptionText]}>{hiddenDescription?photoTexts.showDescription:photoTexts.hideDescription}</Text>
                    </TouchableOpacity>
                    {!hiddenDescription &&

                    <ScrollView style={photoPageStyles.descriptionScrollView}>
                        <Text style={photoPageStyles.dateAndDescriptionText}>{
                            props.photos[photoIndex].description
                        }</Text>
                    </ScrollView>
                    }

                </View>
            }

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