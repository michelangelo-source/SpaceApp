import axios from "axios";

export type APODData = {
    copyright: string,
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    service_version: string,
    title: string,
    url: string,
}

export const getAPOD = async (picDate: string ) => {
    const Api_Key = process.env.EXPO_PUBLIC_API_KEY;
    const origin = process.env.EXPO_PUBLIC_ORIGIN;
    if (!Api_Key || !origin) {
        throw new Error('no API_key or origin');
    }
    try {
        const response = await axios.get<APODData>(origin + "/planetary/apod?&api_key=" + Api_Key + "&date=" + picDate);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
