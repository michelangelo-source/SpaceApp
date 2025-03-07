import {Image, ScrollView, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {useEffect, useState} from "react";
import {LoadingStateType} from "@/types/LoadingStateType";
import {APODData, getAPOD} from "@/components/AstronomicPictureOfTheDay/api/AstonomicPictureOfTheDayRequest";
import {handleDate} from "@/functions/handleDate";
import {APODTexts} from "@/components/AstronomicPictureOfTheDay/texts/APODTexts";
import {APODstyles} from "@/components/AstronomicPictureOfTheDay/styles/APODstyles";
import {DateType} from 'react-native-ui-datepicker';
import CalendarScreen from "@/components/Calendar/calendarScreen";
import {globalStyles} from "@/globalStyles/globalStyles";

export default function Apod() {
    const [loadingState, setLoadingState] = useState<LoadingStateType>("Loading");
    const [isCalendarVisible, setCalendarVisible] = useState<boolean>(false);
    const [APOD, setAPOD] = useState<APODData>();
    const [APODDay, setAPODDay] = useState<string>(handleDate(new Date()));
    const colorScheme = useColorScheme();
    const themeTextStyle =
        colorScheme === 'light' ? globalStyles.lightText : globalStyles.darkText;

    const themeContainerStyle =
        colorScheme === 'light' ? globalStyles.lightContainer : globalStyles.darkContainer;


    const calendarDateToString=(date:DateType)=>{
        if (date) {
            const parts = date.toLocaleString().split(", ")[0].split(".");
            const year = parts[2];
            const month = parts[1].padStart(2, '0');
            const day = parts[0].padStart(2, '0');
            const dateString = `${year}-${month}-${day}`;
            setAPODDay(dateString)
        }

    }

    useEffect(() => {
        setLoadingState("Loading")
        getAPOD(APODDay, setLoadingState).then(res => {
            setAPOD(res)
        })
    }, [APODDay])

    return (
        <View style={[themeContainerStyle, APODstyles.container]}>
            <Text style={themeTextStyle}>{APODTexts.title} <TouchableOpacity onPress={()=>{setCalendarVisible(true)}}><Text style={themeTextStyle}>{APODDay}</Text></TouchableOpacity></Text>
            {loadingState === "Loaded" && APOD ?
                <ScrollView>
                    <Text style={themeTextStyle}>
                        {APOD.title}
                    </Text>



                    {isCalendarVisible&&<CalendarScreen Day={APODDay} returnDate={calendarDateToString} closeScreen={setCalendarVisible}/>}

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

