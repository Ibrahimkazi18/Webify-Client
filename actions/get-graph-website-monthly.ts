import { db } from "@/lib/firebase"
import { Website } from "@/types-db"
import { Timestamp, collection, doc, getDocs } from "firebase/firestore"

interface GraphData {
    name : string,
    total : number,
}

export const getGraphTotalRevenue = (websites :  Website[]) => { 

    const monthlyRevenue : { [key : string] : number } = {}

    for(const website of websites) {
        // const month = website.createdAt?.toDate().toLocaleDateString("en-IN", { month : "short"})
        let date : Date = new Date()

        if(website.createdAt instanceof Date){
            console.log(website.createdAt, "Date")
        }
        else if (typeof website.createdAt === "string") {
            date = new Date(website.createdAt)
        }
        else if (website.createdAt && website.createdAt.seconds && website.createdAt.nanoseconds) {
            date = new Timestamp(website.createdAt.seconds, website.createdAt.nanoseconds).toDate();
        } else {
            console.error("Invalid createdAt value for website:", website.createdAt);
            continue;
        }

        const month = date.toLocaleDateString("en-IN", { month: "short" })

        if(month) {
            let revnueForwebsite = 0;

            revnueForwebsite += website.price

            monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revnueForwebsite
        }
    }

    // Create a map to convert month names to numeric representation
    const monthMap: { [key: string]: number } = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
    };

    //update the grapghData

    const graphData: GraphData[] = Object.keys(monthMap).map((monthName) => ({
        name: monthName,
        total: monthlyRevenue[monthName] || 0,
      }));
    
    return graphData;
}


export const getRevenueCategory = (websites :  Website[]) => { 

    const categoryRevenue : { [key : string] : number } = {}
    const categories = ["E-Commerce","Landing-Page","Non-Profit","Restaurant","Blog/News","Portfolio",]

    for(const website of websites) {
        const category = website.category

        if(category){
            const revenueForItem = website.price;

            categoryRevenue[category] = (categoryRevenue[category] || 0) + revenueForItem;
        }
    }

    for (const category of categories) {
        categoryRevenue[category] = categoryRevenue[category] || 0; // Set the initial value to 0 for each category
      }

    //update the grapghData

    const graphData: GraphData[] = categories.map((category) => ({
        name: category,
        total: categoryRevenue[category] || 0,
      }));
    
    return graphData;
}