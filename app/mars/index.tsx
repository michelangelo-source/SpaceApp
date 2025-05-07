import {Dimensions, FlatList, Image, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {useEffect, useState} from "react";
import {getManifest, RoverManifest} from "@/components/MarsRoverPhotos/api/manifest";
import * as ScreenOrientation from "expo-screen-orientation";
import {LoadingStateType} from "@/types/LoadingStateType";
import CalendarScreen from "@/components/Calendar/calendarScreen";
import {getPhotosByEarthDate, photosByEarthDateArr} from "@/components/MarsRoverPhotos/api/photosByEarthDate";
import {globalStyles} from "@/globalStyles/globalStyles";
import {marsStyles} from "@/components/MarsRoverPhotos/styles/MarsStyles";
import {MarsTexts} from "@/components/MarsRoverPhotos/texts/MarsTexts";

export default function Mars() {
    const [data, setData] = useState<RoverManifest>();
    const [loadingState, setLoadingState] = useState<LoadingStateType>("Loading");
    const [isCalendarVisible, setCalendarVisible] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<string>("");
    const [currPhotos, setCurrPhotos] = useState<photosByEarthDateArr>();
    const [disabledDates, setDisabledDates] = useState<string[]>();
    const [orientation, setOrientation] = useState<number>(-1);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
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
            let tmpEnabledDates: string[] = []
            res.photo_manifest.photos.forEach((el) => {
                tmpEnabledDates.push(el.earth_date)
            })
            setDisabledDates(disableDates(tmpEnabledDates))
            setData(res)
            setCurrentDate(res.photo_manifest.photos[res.photo_manifest.photos.length - 1].earth_date)
        })

        ScreenOrientation.getOrientationAsync().then(res => {
            setOrientation(res)
        })

        ScreenOrientation.addOrientationChangeListener((res) => {
            setOrientation(res.orientationInfo.orientation)
        })

        return () => {
            ScreenOrientation.removeOrientationChangeListeners()
        }
    }, [])
    useEffect(() => {
        getPhotosByEarthDate(setLoadingState, currentDate).then((res) => {
            setCurrPhotos(res)
        })
    }, [currentDate]);

    const disableDates = (enabledDates: string[]) => {
        const toStr = (date: Date) => date.toISOString().slice(0, 10);
        const dates = [...enabledDates].sort();

        const start = new Date(dates[0]);
        const end = new Date(dates[dates.length - 1]);
        const inputSet = new Set(dates);
        const missing: string[] = [];

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const s = toStr(d);
            if (!inputSet.has(s)) missing.push(s);
        }
        return missing;
    }

    return (<View style={[themeContainerStyle, marsStyles.container]}>
        {loadingState === "Loaded" && currentDate && data &&
            <>
                <Text style={[themeTextStyle, marsStyles.title]}>{MarsTexts.title}</Text>
                <TouchableOpacity onPress={() => {
                    setCalendarVisible(true)
                }}
                                  style={[themeChildContainerStyle, marsStyles.dateBtn]}
                >
                    <Text style={[themeTextStyle]}>
                        {currentDate}
                    </Text>
                </TouchableOpacity>


                {currPhotos &&
                    <View style={marsStyles.photoListView}>

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
                            key={orientation === 3 || orientation === 4 ? 6 : 3}
                            numColumns={orientation === 3 || orientation === 4 ? Math.floor(windowWidth / (windowHeight / 3)) + 1 : 3}
                        />

                    </View>

                }


                {isCalendarVisible &&
                    <CalendarScreen Day={currentDate} closeScreen={setCalendarVisible} returnDate={setCurrentDate}
                                    disabledDates={disabledDates} maxDate={new Date(data.photo_manifest.max_date)}
                                    minDate={new Date(data.photo_manifest.photos[0].earth_date)}/>}
            </>

        }
    </View>)
}