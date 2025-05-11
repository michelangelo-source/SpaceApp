import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {getManifest} from "@/components/MarsRoverPhotos/api/manifest";
import * as ScreenOrientation from "expo-screen-orientation";
import CalendarScreen from "@/components/Calendar/calendarScreen";
import {getPhotosByEarthDate} from "@/components/MarsRoverPhotos/api/photosByEarthDate";
import {marsStyles} from "@/components/MarsRoverPhotos/styles/MarsStyles";
import {MarsTexts} from "@/components/MarsRoverPhotos/texts/MarsTexts";
import {PhotoPage} from "@/components/Photo/photoPage";
import {useThemeStyles} from "@/hooks/themeHook";
import {useQuery} from "@tanstack/react-query";



export default function Mars() {
    const [isCalendarVisible, setCalendarVisible] = useState<boolean>(false);
    const [isBigPictureVisible, setBigPictureVisible] = useState<boolean>(false);
    const [bigPictureIndex, setBigPictureIndex] = useState<number>(-1);
    const [currentDate, setCurrentDate] = useState<string>("");
    const [disabledDates, setDisabledDates] = useState<string[]>();
    const [orientation, setOrientation] = useState<number>(-1);
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
        if (manifest) {
            const dates = manifest.photo_manifest.photos.map(p => p.earth_date);
            setDisabledDates(disableDates(dates));
            setCurrentDate(manifest.photo_manifest.photos[manifest.photo_manifest.photos.length - 1].earth_date);
        }
    }, [manifest]);

    if (isManifestPending || isPhotosPending) {
        return <Text>Loading...</Text>
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


            <View style={marsStyles.photoListView}>
                <FlatList
                    style={marsStyles.photoListStyle}
                    data={currPhotos.photos}
                    renderItem={({item, index}) =>
                        <View
                            style={orientation === 3 || orientation === 4 ? marsStyles.photoViewLandscape : marsStyles.photoViewPortrait}>
                            <TouchableOpacity onPress={() => {
                                setBigPictureVisible(true)
                                setBigPictureIndex(index)
                            }}>
                                <Image
                                    key={item.id}
                                    style={orientation === 3 || orientation === 4 ? marsStyles.photoImgLandscape : marsStyles.photoImgPortrait}
                                    resizeMode={"cover"}
                                    source={{
                                        uri: item.img_src,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item) => item.id.toString()}
                    key={orientation === 3 || orientation === 4 ? 6 : 3}
                    numColumns={orientation === 3 || orientation === 4 ? 6 : 3}
                />
            </View>


            {isBigPictureVisible && currPhotos &&
                <PhotoPage swappable={true} photos={currPhotos.photos} index={bigPictureIndex}
                           close={() => setBigPictureVisible(false)}/>
            }

            {isCalendarVisible &&
                <CalendarScreen Day={currentDate} closeScreen={setCalendarVisible} returnDate={setCurrentDate}
                                disabledDates={disabledDates} maxDate={new Date(manifest.photo_manifest.max_date)}
                                minDate={new Date(manifest.photo_manifest.photos[0].earth_date)}/>}
        </>


    </View>)
}