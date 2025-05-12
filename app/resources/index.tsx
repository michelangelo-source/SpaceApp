import {Button, Text, TextInput, View} from "react-native";
import {useQuery,} from "@tanstack/react-query";
import {getResources} from "@/components/Resources/api/getResources";
import {useEffect, useRef, useState} from "react";
import {useThemeStyles} from "@/hooks/themeHook";
import {resourcesStyles} from "@/components/Resources/styles/resourcesStyles";
import {Gallery} from "@/components/Gallery/gallery";


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

            {isPending && query !== "" &&
                <Text>Loading...</Text>
            }
            {isError &&
                <Text>Error: {error.message}</Text>
            }
            {data&&
            <Gallery photos={data.photos}/>
            }

        </View>
    )
}