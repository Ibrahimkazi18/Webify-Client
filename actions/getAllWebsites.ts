import { Website } from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/websites`

const getAllWebsites = async () : Promise<Website[]> => {

    const res = await fetch(URL)

    return res.json()
};

export default getAllWebsites