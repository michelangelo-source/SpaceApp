import {Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {getManifest} from "@/components/MarsRoverPhotos/api/manifest";
import CalendarScreen from "@/components/Calendar/calendarScreen";
import {getPhotosByEarthDate} from "@/components/MarsRoverPhotos/api/photosByEarthDate";
import {marsStyles} from "@/components/MarsRoverPhotos/styles/MarsStyles";
import {MarsTexts} from "@/components/MarsRoverPhotos/texts/MarsTexts";
import {useThemeStyles} from "@/hooks/themeHook";
import {useQuery} from "@tanstack/react-query";
import {Gallery} from "@/components/Gallery/gallery";
import {LoadingScreen} from "@/components/Loading/loadingScreen";


export default function Mars() {
    const [isCalendarVisible, setCalendarVisible] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<string>("");
    const [disabledDates, setDisabledDates] = useState<string[]>();
    const themeStyles = useThemeStyles()

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

    const {isPending: isManifestPending, isError: isManifestError, data: manifest, error: manifestError} = useQuery({
        queryKey: ['manifest'],
        queryFn: getManifest,
    })

    const {isPending: isPhotosPending, isError: isPhotosError, data: currPhotos, error: photosError} = useQuery({
        queryKey: ['photos',currentDate],
        queryFn: () => getPhotosByEarthDate(currentDate),
        enabled: !!currentDate,
    })


    useEffect(() => {
        if (manifest) {
            const dates = manifest.photo_manifest.photos.map(p => p.earth_date);
            setDisabledDates(disableDates(dates));
            setCurrentDate(manifest.photo_manifest.photos[manifest.photo_manifest.photos.length - 1].earth_date);
        }
    }, [manifest]);

    if (isManifestPending || isPhotosPending) {
        return <LoadingScreen/>
    }
    if (isManifestError) {
        return <Text>Error: {manifestError.message}</Text>
    }
    if (isPhotosError) {
        return <Text>Error: {photosError.message}</Text>
    }

    return (<View style={[themeStyles.containerTheme, marsStyles.container]}>
        <>
            <Text style={[themeStyles.textTheme, marsStyles.title]}>{MarsTexts.title}</Text>
            <TouchableOpacity onPress={() => {
                setCalendarVisible(true)
            }}
                              style={[themeStyles.childContainerTheme, marsStyles.dateBtn]}
            >
                <Text style={[themeStyles.textTheme]}>
                    {currentDate}
                </Text>
            </TouchableOpacity>


          <Gallery photos={currPhotos.photos} showDate={false} showDescription={false}/>

            {isCalendarVisible &&
                <CalendarScreen Day={currentDate} closeScreen={setCalendarVisible} returnDate={setCurrentDate}
                                disabledDates={disabledDates} maxDate={new Date(manifest.photo_manifest.max_date)}
                                minDate={new Date(manifest.photo_manifest.photos[0].earth_date)}/>}
        </>


    </View>)
}