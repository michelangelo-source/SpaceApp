import {Text, TextInput, TouchableOpacity, View, Image} from "react-native";
import {useQuery,} from "@tanstack/react-query";
import {getResources} from "@/components/Resources/api/getResources";
import {useEffect, useRef, useState} from "react";
import {useThemeStyles} from "@/hooks/themeHook";
import {resourcesStyles} from "@/components/Resources/styles/resourcesStyles";
import {Gallery} from "@/components/Gallery/gallery";

import {resourcesText} from "@/components/Resources/texts/resourcesText";


export interface resourcesPhoto {
    date_created: string,
    description: string,
    img_src: string,
}

export interface resourcesPhotos {
    photos: Array<resourcesPhoto>;
    "links": Array<
        {
            "rel": "prev" | "next",
            "prompt": "Previous" | "Next",
            "href": string
        }
    >
}


export default function Resources() {
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const queryRef = useRef('');
    const themeStyles = useThemeStyles()
    const {isPending, data, refetch, isError, error} = useQuery({
        queryKey: ["resources", query, page],
        queryFn: () => getResources(query, page),
        enabled: false,
        select: (data) => ({
            photos: data.collection.items.map(item => ({
                date_created: item.data[0].date_created,
                description: item.data[0].description,
                img_src: item.links?.[0]?.href,
            })),
            links: data.links,
        }),
    })
    const submitForm = () => {
        setQuery(queryRef.current)
    }
    useEffect(() => {
        if (query !== "") {
            refetch()
        }
    }, [query])
    return (
        <View style={[themeStyles.containerTheme, resourcesStyles.container]}>
            <View style={resourcesStyles.titleView}>
                <Text style={[themeStyles.textTheme, resourcesStyles.titleText]}>
                    {resourcesText.title}
                </Text>
            </View>

            <View style={[resourcesStyles.formView]}>
                <View style={[themeStyles.childContainerTheme,resourcesStyles.textInputView]}>
                    <TextInput onSubmitEditing={submitForm} onChangeText={(query) => {
                        queryRef.current = query
                    }} placeholder={"Search..."} style={[themeStyles.textTheme]}/>
                </View>
                <TouchableOpacity style={resourcesStyles.submitTouchable} onPress={submitForm}>
                    <View style={[themeStyles.thirdColor, resourcesStyles.submitView]}>
                        <Text
                            style={[themeStyles.textTheme]}>{resourcesText.submitBtn}</Text>
                    </View>
                </TouchableOpacity>

            </View>

            {isPending && query !== "" &&
                <Text>Loading...</Text>
            }
            {isError &&
                <Text>Error: {error.message}</Text>
            }
            {data ?
                <Gallery photos={data.photos}/>
                :
                <Image
                    source={require("@/assets/images/loupe.png")}
                    style={resourcesStyles.loupeStyleImg}
                    resizeMode={"contain"}
                />
            }

        </View>
    )
}