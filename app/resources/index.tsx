import {Button, FlatList, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useQuery,} from "@tanstack/react-query";
import {getResources} from "@/components/Resources/api/getResources";
import {useEffect, useRef, useState} from "react";
import {useThemeStyles} from "@/hooks/themeHook";
import {resourcesStyles} from "@/components/Resources/styles/resourcesStyles";
import {useOrientation} from "@/hooks/useOrientation";
import {globalStyles} from "@/globalStyles/globalStyles";
import {PhotoPage} from "@/components/Photo/photoPage";


export interface resourcesPhoto {
    date_created: string,
    description: string,
    img_src: string,
}



export interface resourcesPhotos{
    photos: [resourcesPhoto];
    "links": [
        {
            "rel": "prev" | "next",
            "prompt": "Previous" | "Next",
            "href": string
        },
    ]
}


export default function Resources() {
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [isBigPictureVisible, setBigPictureVisible] = useState<boolean>(false);
    const [bigPictureIndex, setBigPictureIndex] = useState<number>(-1);
    const queryRef = useRef('');
    const themeStyles = useThemeStyles()
    const orientation=useOrientation();
    const {isPending, data, refetch, isError, error} = useQuery({
        queryKey: ["resources", query, page],
        queryFn: () => getResources(query, page),
        enabled: false,
        select: (data) => ({
            photos: data.collection.items.map((item:any) => {
                const dataPart = item.data?.[0];
                const link = item.links?.[0];
                return {
                    date_created: dataPart?.date_created,
                    description: dataPart?.description,
                    img_src: link?.href
                };

            }),
            links: data.links
        })
    })
    const submitForm = () => {
        setQuery(queryRef.current)
    }
    useEffect(() => {
        console.log(isPending)
        if (query !== "") {
            refetch()
        }
    }, [query])
    return (
        <View style={[themeStyles.containerTheme, resourcesStyles.container]}>
            <Text style={[themeStyles.textTheme]}>
                RESOURCES
            </Text>

            <View style={[themeStyles.childContainerTheme, resourcesStyles.formView]}>
                <TextInput onSubmitEditing={submitForm} onChangeText={(query) => {
                    queryRef.current = query
                }} placeholder={"Search..."} style={[themeStyles.textTheme, resourcesStyles.textInput]}/>
                <Button onPress={submitForm} title={"Submit"}/>
            </View>

            {isPending && query!==""&&
                <Text>Loading...</Text>
            }
            {isError &&
                <Text>Error: {error.message}</Text>
            }

            <View style={globalStyles.photoListView}>
                <FlatList
                    style={globalStyles.photoListStyle}
                    data={data?.photos}
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
            {isBigPictureVisible && data &&
                <PhotoPage swappable={true} photos={data.photos} index={bigPictureIndex}
                           close={() => setBigPictureVisible(false)}/>
            }

        </View>
    )
}