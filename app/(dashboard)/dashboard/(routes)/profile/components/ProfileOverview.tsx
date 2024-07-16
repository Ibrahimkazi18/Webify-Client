"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import RequestCard from "./RequestCard"
import WebsitesCard from "./WebsitesCard"
import MembershipCard from "./MembershipCard"
import { Request, User, Website } from "@/types-db"

export const revalidate = 0

interface ProfileOverviewProps {
    users : User[],
    requests : Request[],
    websites : Website[],
}

const ProfileOverview = ({ users, requests, websites } : ProfileOverviewProps) => {

    const {user} =  useUser()

    const profileUser = users.find(item => item.email === user?.primaryEmailAddress?.emailAddress)
    const profileUserRequest = requests.filter(item => item.email === profileUser?.email).length
    const profileUserWebsite = websites.filter(item => item.ownerId === profileUser?.email).length

    const router = useRouter()

    const handleClickRequests = () => router.push("/dashboard/requests")
    const handleClickWebsites = () => router.push("/dashboard/websites")
    const handleClickMembership = () => router.push("/dashboard/membership")

  return (
    <div className="max-w-[66rem] xl:min-w-[65rem] p-4 mx-2 border rounded-md grid grid-cols-3 gap-3 grid-rows-2 overflow-hidden">
        <div className="col-span-1 row-span-1">
            <RequestCard requests={profileUserRequest} websites={profileUserWebsite} />
        </div>
        <div className="col-span-2">
            <MembershipCard user={profileUser} />
        </div>
        <div className="col-span-3 row-span-1">
            <WebsitesCard user={profileUser} />
        </div>
    </div>
  )
}

export default ProfileOverview