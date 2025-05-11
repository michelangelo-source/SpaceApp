import axios from "axios";

export type photoByEarthDate = {
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
}

export type photosByEarthDateArr = {
    "photos": [photoByEarthDate]
}

export const getPhotosByEarthDate = async (earthDate: string): Promise<photosByEarthDateArr> => {
    const Api_Key = process.env.EXPO_PUBLIC_API_KEY;
    const origin = process.env.EXPO_PUBLIC_ORIGIN;
    if (!Api_Key || !origin) {
        throw new Error('no API_key or origin');
    }
    try {
        const response = await axios.get<photosByEarthDateArr>(origin + "/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + earthDate + "&api_key=" + Api_Key)
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}