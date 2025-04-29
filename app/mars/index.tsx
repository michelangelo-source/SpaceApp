import {Image, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {getManifest, RoverManifest} from "@/components/MarsRoverPhotos/api/manifest";
import {LoadingStateType} from "@/types/LoadingStateType";
import CalendarScreen from "@/components/Calendar/calendarScreen";
import {DateType} from "react-native-ui-datepicker";
import {getPhotosByEarthDate, photosByEarthDate} from "@/components/MarsRoverPhotos/api/photosByEarthDate";

export default function Mars() {
    const [data, setData] = useState<RoverManifest>();
    const [loadingState, setLoadingState] = useState<LoadingStateType>("Loading");
    const [isCalendarVisible, setCalendarVisible] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<string>("");
    const [enabledDates, setEnabledDates] = useState<DateType[]>();
    const [currPhotos, setCurrPhotos] = useState<photosByEarthDate>();
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

    return (<View style={{flex: 1}}>
        {loadingState === "Loaded" && currentDate && data &&
            <>

                <TouchableOpacity onPress={() => {
                    setCalendarVisible(true)
                }}>
                    <Text>
                        {currentDate}
                    </Text>
                </TouchableOpacity>

                {currPhotos && currPhotos.photos.map((photo) => (
                    <Image
                        key={photo.id}
                        style={{
                            width: "100%",
                            height: 300,
                            borderRadius: 5
                        }}
                        resizeMode={"cover"}
                        source={{
                            uri: photo.img_src,
                        }}
                    />
                ))}

                {isCalendarVisible &&
                    <CalendarScreen Day={currentDate} closeScreen={setCalendarVisible} returnDate={setCurrentDate}
                                    enableDates={enabledDates} maxDate={new Date(data.photo_manifest.max_date)}
                                    minDate={new Date(data.photo_manifest.photos[0].earth_date)}/>}

            </>

        }
    </View>)
}