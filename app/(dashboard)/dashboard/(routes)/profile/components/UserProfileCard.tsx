"use client"

import { BackgroundGradient } from "@/components/ui/background-gradient"
import { User } from "@/types-db";
import { UserButton, useUser } from "@clerk/nextjs"
import { format } from "date-fns";
import { CalendarDays, Edit, Mail, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

export interface UserProfileCardProps {
    users : User[]
}

const UserProfileCard = ({ users } : UserProfileCardProps) => {
    const userButtonAppearance = {
        elements: {
          userButtonAvatarBox: "w-56 h-56", // Custom width and height
        },
      };

    
    const {user} =  useUser()

    const profileUser = users.find(item => item.email === user?.primaryEmailAddress?.emailAddress)

    const router = useRouter()

    const handleClick = () => router.push("/dashboard/settings")

    const handleClickBuy = () => router.push("/dashboard/membership")

    function convertToDate(timestamp: { seconds: number; nanoseconds: number }): Date | undefined {
        if (timestamp && typeof timestamp.seconds === 'number' && typeof timestamp.nanoseconds === 'number') {
          return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        }
        return undefined;
      }
    
      let formattedDate = "";

      const createdAtDate = convertToDate(profileUser?.createdAt!);
      if (createdAtDate) {
        formattedDate = format(createdAtDate, "MMMM do, yyyy");
      } else {
        console.error('createdAt is not a valid Firestore Timestamp:', profileUser?.createdAt);
      }

  return (
    <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 max-h-[89vh] bg-white dark:bg-zinc-900">
        <div className="flex items-center justify-center">
           <UserButton
                appearance={userButtonAppearance}
            />
        </div>
        
        <p className="text-base text-center sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          Your Webify Account
        </p>

        <div className="flex items-center gap-4 mt-10">
            <User2 className="w-4 h-4"/>

            <p className="text-lg">
            {profileUser?.name}
            </p>

            <Edit onClick={handleClick} className="w-4 h-4 ml-auto cursor-pointer hover:bg-slate-600"/>
        </div>

        <div className="flex items-center gap-4">
            <Mail className="w-4 h-4"/>

            <p className="text-lg">
            {profileUser?.email}
            </p>
        </div>

        <div className="flex items-center gap-4">
            <CalendarDays className="w-4 h-4"/>

            <p className="text-lg">
            {formattedDate}
            </p>
        </div>

        <div className="grid grid-cols-2 mt-10">
            <div className="col-span-1 space-y-2">
                <p className="text-base">
                    Websites 
                </p>
                <p className="text-base">
                    Requests 
                </p>
                <p className="text-base">
                    Member 
                </p>
            </div>

            <div className="col-span-1 space-y-1">
                <p className="text-lg font-bold">
                    {profileUser?.websiteCount} 
                </p>
                <p className="text-lg font-bold">
                    {profileUser?.request ? "Yes" : "No"} 
                </p>
                <p className="text-lg font-bold">
                    {profileUser?.member ? "Yes" : "No"} 
                </p>
            </div>
        </div>

        {!profileUser?.member ? (
          <button onClick={handleClickBuy} className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <span>Become Member </span>
            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              ₹5000
            </span>
          </button>
        ) : <div className="mt-4">

            </div>}
      </BackgroundGradient>
  )
}

export default UserProfileCard