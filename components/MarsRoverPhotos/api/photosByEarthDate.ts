import {LoadingStateType} from "@/types/LoadingStateType";

export type photosByEarthDate={
    "photos": [
        {
            "id": number,
            "sol": number,
            "camera": {
                "id": number,
                "name": string,
                "rover_id": number,
                "full_name": string
            },
            "img_src": string,
            "earth_date": string,
            "rover": {
                "id": number,
                "name": string,
                "landing_date": string,
                "launch_date": string,
                "status": string
            }
        },
    ]
}

export const getPhotosByEarthDate=async (setLoadingState:(state:LoadingStateType)=>void,earthDate:string):Promise<photosByEarthDate>=>{
    const Api_Key = process.env.EXPO_PUBLIC_API_KEY;
    const origin = process.env.EXPO_PUBLIC_ORIGIN;
    if (!Api_Key || !origin) {
        setLoadingState("Failed")
        throw new Error('no API_key or origin');
    }
    try {
        const response = await fetch(origin + "/mars-photos/api/v1/rovers/curiosity/photos?earth_date="+earthDate+"&api_key=" +Api_Key )
        if(!response.ok) {
            setLoadingState("Failed")
        }
        setLoadingState("Loaded")
        return await response.json();
    } catch (err) {
        setLoadingState("Failed")
        throw err;
    }
}