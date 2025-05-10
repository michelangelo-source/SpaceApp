import {Image, Linking, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {LoadingStateType} from "@/types/LoadingStateType";
import {APODData, getAPOD} from "@/components/AstronomicPictureOfTheDay/api/AstonomicPictureOfTheDayRequest";
import {handleDate} from "@/functions/handleDate";
import {APODTexts} from "@/components/AstronomicPictureOfTheDay/texts/APODTexts";
import {APODstyles} from "@/components/AstronomicPictureOfTheDay/styles/APODstyles";
import CalendarScreen from "@/components/Calendar/calendarScreen";
import {useThemeStyles} from "@/hooks/themeHook";
import {PhotoPage} from "@/components/Photo/photoPage";

export default function Apod() {
    const [loadingState, setLoadingState] = useState<LoadingStateType>("Loading");
    const [isCalendarVisible, setCalendarVisible] = useState<boolean>(false);
    const [APOD, setAPOD] = useState<APODData>();
    const [APODDay, setAPODDay] = useState<string>(handleDate(new Date()));
    const themeStyles = useThemeStyles()
    const [isBigPictureVisible, setBigPictureVisible] = useState<boolean>(false);

    useEffect(() => {
        setLoadingState("Loading")
        getAPOD(APODDay, setLoadingState).then(res => {
            setAPOD(res)
        })
    }, [APODDay])

    return (
        <View style={[themeStyles.containerTheme, APODstyles.container]}>
            <ScrollView style={APODstyles.scrollView}>
                <View style={APODstyles.titleView}>
                    <Text style={[themeStyles.textTheme, APODstyles.titleText]}>{APODTexts.title}</Text>
                    <TouchableOpacity style={[themeStyles.childContainerTheme, APODstyles.chosenDate]} onPress={() => {
                        setCalendarVisible(true)
                    }}>
                        <Text style={themeStyles.textTheme}>{APODDay}</Text>
                    </TouchableOpacity>
                </View>

                {loadingState === "Loaded" && APOD && APOD.media_type === "image" ?
                    <>
                        <Text style={themeStyles.textTheme}>
                            {APOD.title}
                        </Text>

                        <TouchableOpacity onPress={() => {
                            setBigPictureVisible(true)
                        }}>
                            <Image
                                style={APODstyles.pictureOfTheDay}
                                resizeMode={"cover"}
                                source={{
                                    uri: APOD.url,
                                }}
                            />
                        </TouchableOpacity>
                        {APOD.copyright && <Text
                            style={[themeStyles.textTheme, APODstyles.credentialsText]}>Credentials: {APOD.copyright}</Text>}
                        <View style={[themeStyles.childContainerTheme, APODstyles.pictureExplanationView]}>
                            <Text style={[themeStyles.textTheme, APODstyles.pictureExplanation]}>
                                {APOD.explanation}
                            </Text>
                        </View>
                    </>
                    :
                    loadingState === "Loaded" && APOD ?
                        <Text style={themeStyles.textTheme}>Wrong file format to see check:
                            <Text onPress={() => {
                                Linking.openURL(APOD.url)
                            }}>{APOD.url}</Text>
                        </Text> : <Text style={themeStyles.textTheme}>{loadingState}</Text>
                }


            </ScrollView>
            {isCalendarVisible &&
                <CalendarScreen Day={APODDay} returnDate={setAPODDay} closeScreen={setCalendarVisible}
                                minDate={new Date(1995, 5, 16)}/>}
            {isBigPictureVisible && APOD &&
                <PhotoPage swappable={false}
                           src={APOD.url}
                           close={() => setBigPictureVisible(false)}/>
            }
        </View>
    );
}

