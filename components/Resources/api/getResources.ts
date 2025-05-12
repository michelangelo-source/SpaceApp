import axios from "axios";


interface NasaResources {
    collection: {
        items: Array<{
            data: Array<
                {
                    date_created: string,
                    description: string,
                }
            >
            links: Array<
                {
                    href: string,
                }>
        }
        >
    }
    "links": Array<
        {
            "rel": "prev" | "next",
            "prompt": "Previous" | "Next",
            "href": string
        }
    >
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