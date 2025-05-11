import {Button, Text, TextInput, View} from "react-native";
import {useQuery,} from "@tanstack/react-query";
import {getResources} from "@/components/Resources/api/getResources";
import {useRef, useState} from "react";
import {useThemeStyles} from "@/hooks/themeHook";
import {resourcesStyles} from "@/components/Resources/styles/resourcesStyles";

export default function Resources() {
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const queryRef = useRef('');
    const themeStyles = useThemeStyles()

    const {isPending, refetch, data, isError, error} = useQuery({
        queryKey: ["resources", query, page],
        queryFn: () => getResources(query, page),
        enabled: false,
    })
    const submitForm = () => {
        setQuery(queryRef.current)
        refetch();
    }

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

            {isPending &&
                <Text>Loading...</Text>
            }

            {isError &&
                <Text>Error: {error.message}</Text>
            }
        </View>
    )
}