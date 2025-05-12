import {FlatList, Image, TouchableOpacity, View} from "react-native";
import {globalStyles} from "@/globalStyles/globalStyles";
import {PhotoPage} from "@/components/Photo/photoPage";
import {useEffect, useState} from "react";
import {useOrientation} from "@/hooks/useOrientation";
import {resourcesPhoto} from "@/app/resources";
import {photoByEarthDate} from "@/components/MarsRoverPhotos/api/photosByEarthDate";

interface GalleryProps {
    photos: resourcesPhoto[] | photoByEarthDate[]
}

type UnifiedPhoto = {
    date_created: string;
    description?: string;
    img_src: string;
};

export const Gallery = (props: GalleryProps) => {
    const [isBigPictureVisible, setBigPictureVisible] = useState<boolean>(false);
    const [bigPictureIndex, setBigPictureIndex] = useState<number>(-1);
    const [photos, setPhotos] = useState<UnifiedPhoto[]>([]);
    const orientation = useOrientation();

    useEffect(() => {
        setPhotos(() => {
                return props.photos.map((item: any): UnifiedPhoto => ({
                    date_created: item.date_created ?? item.earth_date,
                    description: item.description,
                    img_src: item.img_src,
                }))
            }
        )
    }, []);

    return (
        <>
            <View style={globalStyles.photoListView}>
                <FlatList
                    style={globalStyles.photoListStyle}
                    data={photos}
                    renderItem={({item, index}) =>
                        <View
                            style={orientation === 3 || orientation === 4 ? globalStyles.photoViewLandscape : globalStyles.photoViewPortrait}>
                            <TouchableOpacity onPress={() => {
                                setBigPictureVisible(true)
                                setBigPictureIndex(index)
                            }}>
                                <Image
                                    key={item.img_src}
                                    style={orientation === 3 || orientation === 4 ? globalStyles.photoImgLandscape : globalStyles.photoImgPortrait}
                                    resizeMode={"cover"}
                                    source={{
                                        uri: item.img_src,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item) => item.img_src.toString()}
                    key={orientation === 3 || orientation === 4 ? 6 : 3}
                    numColumns={orientation === 3 || orientation === 4 ? 6 : 3}
                />
            </View>
            {isBigPictureVisible && props &&
                <PhotoPage swappable={true} photos={props.photos} index={bigPictureIndex}
                           close={() => setBigPictureVisible(false)}/>
            }
        </>
    )
}