
import { format } from "date-fns"

import { RequestColumn } from "./components/columns"
import { formatter } from "@/lib/utils"
import RequestClient from "./components/client"
import getRequests from "@/actions/getRequests"

export const revalidate = 0

const RequestPage = async ({params} : {params : { storeId : string}}) => {

  const requestsData = await getRequests()

  function convertToDate(timestamp: { seconds: number; nanoseconds: number }): Date | null {
    if (timestamp && typeof timestamp.seconds === 'number' && typeof timestamp.nanoseconds === 'number') {
      return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    }
    return null;
  }


  const formattedRequest : RequestColumn[] = requestsData.map(
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
      email : item.email,
      member : item.member,
      price : formatter.format(item.price),
      type : item.type,
      status : item.status,
      createdAt: formattedDate
    }}
  );

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <RequestClient data={formattedRequest} />
        </div>
    </div>
  )
}

export default RequestPage