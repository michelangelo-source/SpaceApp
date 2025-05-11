import axios from "axios";

export type RoverManifest = {
    "photo_manifest": {
        "name": string,
        "landing_date": string,
        "launch_date": string,
        "status": string,
        "max_sol": number,
        "max_date": string,
        "total_photos": number,
        "photos": [
            {
                "sol": number,
                "earth_date": string,
                "total_photos": number,
                "cameras": string[]
            },
        ]
    }
}

export const getManifest = async (): Promise<RoverManifest> => {
    const Api_Key = process.env.EXPO_PUBLIC_API_KEY;
    const origin = process.env.EXPO_PUBLIC_ORIGIN;
    if (!Api_Key || !origin) {
        throw new Error('no API_key or origin');
    }
    try {
        const response = await axios.get<RoverManifest>(origin + "/mars-photos/api/v1/manifests/Curiosity?API_KEY=" + Api_Key)
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}