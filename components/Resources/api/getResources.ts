import axios from "axios";


interface NasaResources {
    collection: {
        version: string,
        href: string,
        items: [
            href: string,
            data: [
                {
                    album: string[],
                    center: string,
                    date_created: string,
                    description: string,
                    keywords: string[],
                    media_type: string,
                    nasa_id: string,
                    secondary_creator: string,
                    title: string
                }
            ],
            links: [
                {
                    href: string,
                    rel: string,
                    render: string,
                    width: number,
                    size: number,
                    height: number
                }
            ]
        ]
    }
    "metadata": {
        "total_hits": number
    },
    "links": [
        {
            "rel": "prev" | "next",
            "prompt": "Previous" | "Next",
            "href": string
        },
    ]
}

export const getResources = async (query: string, page: number) => {
    try {
        const response = await axios.get<NasaResources>(`http://images-api.nasa.gov/search?q=${query}&media_type=image&page=${page}`)
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}