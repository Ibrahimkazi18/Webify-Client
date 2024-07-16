import { Request } from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/requests`

const getRequests = async () : Promise<Request[]> => {

    const res = await fetch(URL)

    return res.json()
};

export default getRequests