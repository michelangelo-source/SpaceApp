import {LoadingStateType} from "@/types/LoadingStateType";

export type APODData={
    copyright:string,
    date:string,
    explanation	:string,
    hdurl:	string,
    media_type:	string,
    service_version:	string,
    title:	string,
    url:string,
}

export const getAPOD=async (picDate:string ,setLoadingState:(state:LoadingStateType)=>void):Promise<APODData>=>{
    const Api_Key = process.env.EXPO_PUBLIC_API_KEY;
    const origin = process.env.EXPO_PUBLIC_ORIGIN;
    if (!Api_Key || !origin) {
        setLoadingState("Failed")
        throw new Error('no API_key or origin');
    }
    try {
        const response = await fetch(origin + "/planetary/apod?&api_key=" +Api_Key +"&date="+picDate)
        if(!response.ok) {
            setLoadingState("Failed")
        }
        setLoadingState("Loaded")
        console.log(response)
        return await response.json();
    } catch (err) {
        setLoadingState("Failed")
        throw err;
    }
}