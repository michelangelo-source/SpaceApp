import {Image, Linking, ScrollView, Text, TouchableOpacity, useColorScheme, View} from "react-native";
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

    const themeChildContainerStyle =
        colorScheme === 'light' ? APODstyles.childColorLight : APODstyles.childColorDark;

    const calendarDateToString=(date:DateType)=>{
        if (date) {
            if(date instanceof Date){

                const year = date.getUTCFullYear();
                const month = date.getUTCMonth() + 1;
                let day = date.getUTCDate();
                if(date.getTimezoneOffset()!==0){
                    day++;
                }
                const formattedMonth = month.toString().padStart(2, '0');
                const formattedDay = day.toString().padStart(2, '0');
                const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
                setAPODDay(formattedDate);
            }

        }

    }

    useEffect(() => {
        setLoadingState("Loading")
        getAPOD(APODDay, setLoadingState).then(res => {
            setAPOD(res)
        })
    }, [APODDay])

    return (
        <ScrollView style={[themeContainerStyle, APODstyles.container]}>

            <View style={APODstyles.titleView}>


            <Text style={[themeTextStyle,APODstyles.titleText]}>{APODTexts.title}</Text>


                <TouchableOpacity style={[APODstyles.chosenDate,themeChildContainerStyle]} onPress={()=>{setCalendarVisible(true)}}>
                    <Text style={themeTextStyle}>{APODDay}</Text>
                </TouchableOpacity>

            </View>
            {isCalendarVisible&&<CalendarScreen Day={APODDay} returnDate={calendarDateToString} closeScreen={setCalendarVisible}/>}
            {loadingState === "Loaded" && APOD && APOD.media_type==="image" ?
                <>
                    <Text style={themeTextStyle}>
                        {APOD.title}
                    </Text>




                    <Image
                        style={APODstyles.pictureOfTheDay}
                        resizeMode={"cover"}
                        source={{
                            uri: APOD.url,
                        }}
                    />

                    {APOD.copyright&& <Text style={[themeTextStyle,APODstyles.credentialsText]}>Credentials: {APOD.copyright}</Text>}

                    <View style={[themeChildContainerStyle,APODstyles.pictureExplanationView]}>

                    <Text style={[themeTextStyle,APODstyles.pictureExplanation]}>
                        {APOD.explanation}
                    </Text>
                    </View>

                </>
                :
                loadingState === "Loaded"&&APOD ? <Text style={themeTextStyle}>Wrong file format to see check:
                    <Text   onPress={() => {
                        Linking.openURL(APOD.url)}}>{APOD.url}</Text>
                    </Text>  :<Text style={themeTextStyle}>{loadingState}</Text>


            }
        </ScrollView>
    );
}

