import { db } from "@/lib/firebase"
import { Website } from "@/types-db"
import { collection, doc, getDocs } from "firebase/firestore"

export const getWebsiteRevenue = async (storeId : string, email : string | undefined) => {
    const websitesData = (
        await getDocs(collection(doc(db, "stores", storeId), "websites"))
    ).docs.map((doc) => doc.data()) as Website[]

    const websites = websitesData.filter(item => item.owner === email)
    
    const totalRevenue = websites.reduce((total, website) => total + website.price, 0)

    return totalRevenue
}