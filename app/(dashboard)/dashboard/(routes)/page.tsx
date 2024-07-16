import getUser from "@/actions/getUser"
import Heading from "@/components/heading"
import { Separator } from "@/components/ui/separator"
import OverviewClient from "./_components/client"
import getAllWebsites from "@/actions/getAllWebsites"
import getAllMemberships from "@/actions/getMemberships"

export const revalidate = 0

interface DashboardOverviewProps {
  params : { storeId : string}
}

const DashboardOverview = async ({ params } : DashboardOverviewProps) => {

  const users = await getUser()
  const websites = await getAllWebsites()
  const memberhsips = await getAllMemberships()

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your account"/>

        <Separator />

        <OverviewClient users={users} params={params.storeId} websites={websites} memberships={memberhsips}/>

      </div>
    </div>
  )
}

export default DashboardOverview