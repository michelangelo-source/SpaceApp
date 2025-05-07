import {FlatList, Image, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {useEffect, useState} from "react";
import {getManifest, RoverManifest} from "@/components/MarsRoverPhotos/api/manifest";
import {LoadingStateType} from "@/types/LoadingStateType";
import CalendarScreen from "@/components/Calendar/calendarScreen";
import {DateType} from "react-native-ui-datepicker";
import {getPhotosByEarthDate, photosByEarthDateArr} from "@/components/MarsRoverPhotos/api/photosByEarthDate";
import {globalStyles} from "@/globalStyles/globalStyles";
import {marsStyles} from "@/components/MarsRoverPhotos/styles/MarsStyles";
import {MarsTexts} from "@/components/MarsRoverPhotos/texts/MarsTexts";

export default function Mars() {
    const [data, setData] = useState<RoverManifest>();
    const [loadingState, setLoadingState] = useState<LoadingStateType>("Loading");
    const [isCalendarVisible, setCalendarVisible] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<string>("");
    const [enabledDates, setEnabledDates] = useState<DateType[]>();
    const [currPhotos, setCurrPhotos] = useState<photosByEarthDateArr>();

    const colorScheme = useColorScheme();
    const themeTextStyle =
        colorScheme === 'light' ? globalStyles.lightText : globalStyles.darkText;

    const themeContainerStyle =
        colorScheme === 'light' ? globalStyles.lightContainer : globalStyles.darkContainer;

    const themeChildContainerStyle =
        colorScheme === 'light' ? globalStyles.childColorLight : globalStyles.childColorDark;


    useEffect(() => {
        setLoadingState("Loading")
        getManifest(setLoadingState).then(res => {
            let tmpEnabledDates: DateType[] = []
            res.photo_manifest.photos.forEach((el) => {
                tmpEnabledDates.push(el.earth_date)
            })
            setEnabledDates(tmpEnabledDates)
            setData(res)
            setCurrentDate(res.photo_manifest.photos[res.photo_manifest.photos.length - 1].earth_date)
        })
    }, [])
    useEffect(() => {
        getPhotosByEarthDate(setLoadingState, currentDate).then((res) => {
            setCurrPhotos(res)
        })
    }, [currentDate]);


    return (<View style={[themeContainerStyle, marsStyles.container]}>
        {loadingState === "Loaded" && currentDate && data &&
            <>
                <Text  style={[themeTextStyle,marsStyles.title]}>{MarsTexts.title}</Text>
                <TouchableOpacity onPress={() => {
                    setCalendarVisible(true)
                }}
                style={[themeChildContainerStyle,marsStyles.dateBtn]}
                >
                    <Text style={[themeTextStyle]}>
                        {currentDate}
                    </Text>
                </TouchableOpacity>


                {currPhotos &&
                    <FlatList
                        style={marsStyles.photoListStyle}
                        data={currPhotos.photos}
                        renderItem={({item}) =>
                            <View style={marsStyles.photoView}>

                                <Image
                                    key={item.id}
                                    style={marsStyles.photoImg}
                                    resizeMode={"cover"}
                                    source={{
                                        uri: item.img_src,
                                    }}
                                />
                            </View>

                        }
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={3}
                    />
                }





                {isCalendarVisible &&
                    <CalendarScreen Day={currentDate} closeScreen={setCalendarVisible} returnDate={setCurrentDate}
                                    enableDates={enabledDates} maxDate={new Date(data.photo_manifest.max_date)}
                                    minDate={new Date(data.photo_manifest.photos[0].earth_date)}/>}
            </>

        }
    </View>)
}