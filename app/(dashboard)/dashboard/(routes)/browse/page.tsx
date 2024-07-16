import { format } from "date-fns"

import { WebsiteCardProps } from "./components/client"
import { formatter } from "@/lib/utils"
import WebsiteClient from "./components/client"
import getAllWebsites from "@/actions/getAllWebsites"
import { Website } from "@/types-db"

export const revalidate = 0

const BrowsePage = async ({params} : {params : { storeId : string}}) => {

  const websitesData = await getAllWebsites({}) as Website[]

  function convertToDate(timestamp: { seconds: number; nanoseconds: number }): Date | null {
    if (timestamp && typeof timestamp.seconds === 'number' && typeof timestamp.nanoseconds === 'number') {
      return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    }
    return null;
  }

  const formattedWebsites : WebsiteCardProps[] = websitesData.map(
    (item, i) => {

      let formattedDate = "";

      const createdAtDate = convertToDate(item.createdAt);
      if (createdAtDate) {
        formattedDate = format(createdAtDate, "MMMM do, yyyy");
      } else {
        console.error('createdAt is not a valid Firestore Timestamp:', item.createdAt);
      }

      return {
      id : item.id,
      name : item.name,
      price : formatter.format(item.price),
      url : item.url,
      owner : item.owner,
      ownerId : item.ownerId,
      category : item.category,
      images : item.images,
      isFeatured : item.isFeatured,
      createdAt: formattedDate
    }}
  );

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <WebsiteClient data={formattedWebsites} />
        </div>
    </div>
  )
}

export default BrowsePage