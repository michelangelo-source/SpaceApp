import {Image, Linking, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {getAPOD} from "@/components/AstronomicPictureOfTheDay/api/AstonomicPictureOfTheDayRequest";
import {handleDate} from "@/functions/handleDate";
import {APODTexts} from "@/components/AstronomicPictureOfTheDay/texts/APODTexts";
import {APODstyles} from "@/components/AstronomicPictureOfTheDay/styles/APODstyles";
import CalendarScreen from "@/components/Calendar/calendarScreen";
import {useThemeStyles} from "@/hooks/themeHook";
import {PhotoPage} from "@/components/Photo/photoPage";
import {useQuery} from "@tanstack/react-query";

export default function Apod() {
    const [isCalendarVisible, setCalendarVisible] = useState<boolean>(false);
    const [APODDay, setAPODDay] = useState<string>(handleDate(new Date()));
    const themeStyles = useThemeStyles()
    const [isBigPictureVisible, setBigPictureVisible] = useState<boolean>(false);

    const {isPending, isError, data, error} = useQuery({
        queryKey: [APODDay],
        queryFn: () => getAPOD(APODDay),
    })

    if (isPending) {
        return <Text>Loading...</Text>
    }

    if (isError) {
        return <Text>Error: {error.message}</Text>
    }

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
                {data.media_type === "image" ?
                    <>
                        <Text style={themeStyles.textTheme}>
                            {data.title}
                        </Text>

                        <TouchableOpacity onPress={() => {
                            setBigPictureVisible(true)
                        }}>
                            <Image
                                style={APODstyles.pictureOfTheDay}
                                resizeMode={"cover"}
                                source={{
                                    uri: data.url,
                                }}
                            />
                        </TouchableOpacity>
                        {data.copyright && <Text
                            style={[themeStyles.textTheme, APODstyles.credentialsText]}>Credentials: {data.copyright}</Text>}
                        <View style={[themeStyles.childContainerTheme, APODstyles.pictureExplanationView]}>
                            <Text style={[themeStyles.textTheme, APODstyles.pictureExplanation]}>
                                {data.explanation}
                            </Text>
                        </View>
                    </>
                    :
                    <Text style={themeStyles.textTheme}>{APODTexts.wrongFormat}{"\n"}
                        <Text style={APODstyles.wrongFormatLink} onPress={() => {
                            Linking.openURL(data.url)
                        }}>{data.url}</Text>
                    </Text>
                }


            </ScrollView>
            {isCalendarVisible &&
                <CalendarScreen Day={APODDay} returnDate={setAPODDay} closeScreen={setCalendarVisible}
                                minDate={new Date(1995, 5, 16)}/>}
            {isBigPictureVisible &&
                <PhotoPage swappable={false}
                           src={data.url}
                           close={() => setBigPictureVisible(false)}/>
            }
        </View>
    );
}

