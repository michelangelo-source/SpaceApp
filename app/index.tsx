import {Image, ScrollView, Text, useColorScheme, View} from "react-native";
import {useEffect, useState} from "react";
import {LoadingStateType} from "@/types/LoadingStateType";
import {APODData, getAPOD} from "@/components/AstronomicPictureOfTheDay/api/AstonomicPictureOfTheDayRequest";
import {handleDate} from "@/functions/handleDate";
import {APODTexts} from "@/components/AstronomicPictureOfTheDay/texts/APODTexts";
import {APODstyles} from "@/components/AstronomicPictureOfTheDay/styles/APODstyles";


export default function Index() {
    const [loadingState, setLoadingState] = useState<LoadingStateType>("Loading");
    const [APOD, setAPOD] = useState<APODData>();
    const [APODDay, setAPODDay] = useState<string>(handleDate(new Date()));
    const colorScheme = useColorScheme();
    const themeTextStyle =
        colorScheme === 'light' ? APODstyles.lightText : APODstyles.darkText;

    const themeContainerStyle =
        colorScheme === 'light' ? APODstyles.lightContainer : APODstyles.darkContainer;

    useEffect(() => {
        getAPOD(APODDay, setLoadingState).then(res => {
            setAPOD(res)
        })
    }, [APODDay])

    return (
        <View style={[themeContainerStyle, APODstyles.container]}>
            <Text style={themeTextStyle}>{APODTexts.title} {APODDay}</Text>
            {loadingState === "Loaded" && APOD ?
                <ScrollView>
                    <Text>
                        {APOD.title}
                    </Text>
                    <Image
                        style={APODstyles.pictureOfTheDay}
                        resizeMode={"cover"}
                        source={{
                            uri: APOD.hdurl,
                        }}
                    />
                    <Text  style={themeTextStyle}>{APOD.copyright}</Text>
                    <Text  style={themeTextStyle}>
                        {APOD.explanation}
                    </Text>
                </ScrollView>
                : <Text  style={themeTextStyle}>{loadingState}</Text>}
        </View>
    );
}

