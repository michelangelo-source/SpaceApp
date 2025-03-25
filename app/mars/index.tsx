import {Text} from "react-native";
import {useEffect, useState} from "react";
import {getManifest} from "@/components/MarsRoverPhotos/api/manifest";
import {LoadingStateType} from "@/types/LoadingStateType";

export default function Mars(){
    const [loadingState, setLoadingState] = useState<LoadingStateType>("Loading");
    useEffect(() => {
        setLoadingState("Loading")
        getManifest(setLoadingState).then(res => {
           console.log(res.photo_manifest.photos[0])
        })
    }, [])


    return(<Text>
        MARS
    </Text>)
}