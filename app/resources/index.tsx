import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useQuery,} from "@tanstack/react-query";
import {getResources} from "@/components/Resources/api/getResources";
import {useEffect, useRef, useState} from "react";
import {useThemeStyles} from "@/hooks/themeHook";
import {resourcesStyles} from "@/components/Resources/styles/resourcesStyles";
import {Gallery} from "@/components/Gallery/gallery";
import {resourcesText} from "@/components/Resources/texts/resourcesText";
import {LoadingScreen} from "@/components/Loading/loadingScreen";

export interface resourcesPhoto {
    date_created: string,
    description: string,
    img_src: string,
}

export interface resourcesPhotos {
    photos: Array<resourcesPhoto>;
    links:
        {
            prev: boolean,
            next: boolean,
        }
}

export default function Resources() {
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [date, setDate] = useState<Date>();
    const queryRef = useRef('');
    const themeStyles = useThemeStyles()
    const {isPending, data, refetch, isError, error} = useQuery({
        queryKey: ["resources", query, page, date],
        queryFn: () => getResources(query, page),
        enabled: false,
        select: (data) => {
            const items = data?.collection?.items ?? [];
            const links = data?.collection?.links ?? [];
            return {
                photos: items.map(item => ({
                    date_created: item?.data[0].date_created,
                    description: item?.data[0].description,
                    img_src: item?.links?.[0]?.href,
                })),
                links: {
                    prev: links.some(link => link.rel === "prev" && link.prompt === "Previous"),
                    next: links.some(link => link.rel === "next" && link.prompt === "Next"),
                }
            }
        },
    })
    const submitForm = () => {
        if (queryRef.current !== query) {
            setQuery(queryRef.current)
            setPage(1)
        }
    }
    useEffect(() => {
        if (query !== "") {
            refetch()
        }
    }, [query, date])
    const previousPage = () => {
        setPage(page - 1)
        setDate(new Date())
    }
    const nextPage = () => {
        setPage(page + 1)
        setDate(new Date())
    }
    return (
        <View style={[themeStyles.containerTheme, resourcesStyles.container]}>
            <View style={resourcesStyles.titleView}>
                <Text style={[themeStyles.textTheme, resourcesStyles.titleText]}>
                    {resourcesText.title}
                </Text>
            </View>
            <View style={[resourcesStyles.formView]}>
                <View style={[themeStyles.childContainerTheme, resourcesStyles.textInputView]}>
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
                <LoadingScreen/>
            }
            {isError &&
                <Text>Error: {error.message}</Text>
            }
            {data &&
                <>
                {data.photos.length !== 0 ?
                    <>
                        <Gallery photos={data.photos} showDate={true} showDescription={true}/>
                        {(data.links.prev || data.links.next) &&
                            <View style={[resourcesStyles.navigationBar]}>
                                <TouchableOpacity style={[resourcesStyles.prevTouchable]}
                                                  onPress={previousPage}>
                                    {data.links.prev
                                        &&
                                        <View style={[themeStyles.thirdColor, resourcesStyles.prevButton]}>
                                            <Text
                                                style={[themeStyles.textTheme]}>{resourcesText.previousPage}</Text>
                                        </View>

                                    }
                                </TouchableOpacity>
                                {
                                    data.links.next
                                    &&
                                    <TouchableOpacity style={[resourcesStyles.nextTouchable]}
                                                      onPress={nextPage}>
                                        <View style={[themeStyles.childContainerTheme, resourcesStyles.nextButton]}>
                                            <Text style={[themeStyles.textTheme]}>{resourcesText.nextPage}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>
                        }
                    </>
                    : <View style={resourcesStyles.noDataView}>
                        <Text style={[themeStyles.textTheme]}>{resourcesText.notFoundPage}</Text>
                    </View>}
                    </>
                }
                {query === "" &&
                    <Image
                        source={require("@/assets/images/loupe.png")}
                        style={resourcesStyles.loupeStyleImg}
                        resizeMode={"contain"}
                    />
                }

                </View>
                )
            }