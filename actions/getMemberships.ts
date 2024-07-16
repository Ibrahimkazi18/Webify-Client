import { Membership } from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/memberships`

const getAllMemberships = async () : Promise<Membership[]> => {

    const res = await fetch(URL)

    return res.json()
};

export default getAllMemberships