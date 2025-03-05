import {Image, ScrollView, Text, useColorScheme, View} from "react-native";
import {useEffect, useState} from "react";
import {LoadingStateType} from "@/types/LoadingStateType";
import {APODData, getAPOD} from "@/components/AstronomicPictureOfTheDay/api/AstonomicPictureOfTheDayRequest";
import {handleDate} from "@/functions/handleDate";
import {APODTexts} from "@/components/AstronomicPictureOfTheDay/texts/APODTexts";
import {APODstyles} from "@/components/AstronomicPictureOfTheDay/styles/APODstyles";
import DateTimePicker, {getDefaultStyles} from 'react-native-ui-datepicker';

export default function Index() {
    const [loadingState, setLoadingState] = useState<LoadingStateType>("Loading");
    const [APOD, setAPOD] = useState<APODData>();
    const [APODDay, setAPODDay] = useState<string>(handleDate(new Date()));
    const colorScheme = useColorScheme();
    const themeTextStyle =
        colorScheme === 'light' ? APODstyles.lightText : APODstyles.darkText;
    const defaultStyles = getDefaultStyles();
    const themeContainerStyle =
        colorScheme === 'light' ? APODstyles.lightContainer : APODstyles.darkContainer;

    useEffect(() => {
        setLoadingState("Loading")
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
                    <DateTimePicker
                        mode="single"
                        date={APODDay}
                        minDate={new Date(1995, 5, 16)}
                        maxDate={new Date()}
                        onChange={({date}) => {
                            if (date) {
                                const parts = date.toLocaleString().split(", ")[0].split(".");
                                const year = parts[2];
                                const month = parts[1].padStart(2, '0'); // Uzupełnij miesiąc o brakujące zero jeśli potrzeba
                                const day = parts[0].padStart(2, '0'); // Uzupełnij dzień o brakujące zero jeśli potrzeba

                                const dateString = `${year}-${month}-${day}`;
                                setAPODDay(dateString)
                            }

                        }}
                        styles={{
                            ...defaultStyles,
                            selected: { backgroundColor: 'blue' }, // Highlight the selected day
                    }}
                    />
                    <Image
                        style={APODstyles.pictureOfTheDay}
                        resizeMode={"cover"}
                        source={{
                            uri: APOD.url,
                        }}
                    />
                    <Text style={themeTextStyle}>{APOD.copyright}</Text>
                    <Text style={themeTextStyle}>
                        {APOD.explanation}
                    </Text>
                </ScrollView>
                : <Text style={themeTextStyle}>{loadingState}</Text>}
        </View>
    );
}

