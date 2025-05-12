import {useEffect, useState} from "react";
import * as ScreenOrientation from "expo-screen-orientation";

export const useOrientation = () => {
    const [orientation, setOrientation] = useState<number>(-1);
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
    return orientation
}
