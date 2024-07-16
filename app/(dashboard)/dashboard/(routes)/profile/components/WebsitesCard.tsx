"use client"

import { Separator } from "@/components/ui/separator"
import { ProfileCards } from "./RequestCard"
import Card from "./Card"
import { useRouter } from "next/navigation"

const WebsitesCard = ({user} : ProfileCards) => {
  const total = user?.websites.reduce((total, website) => total + website.price, 0)
  const websites = user?.websites.slice(0, 2)

  const router = useRouter()

  const handle = () => {
    router.push(`/dashboard/websites`)
  }

  return (
    <div className="rounded-md p-2 dark:bg-slate-900 bg-slate-200 w-full h-full flex flex-col text-center">
      <div>
        <h2 className="font-semibold text-lg">Websites</h2>
      </div>

      <div className="grid grid-cols-4 p-2 w-full h-full gap-2">
        <div className="col-span-1 p-2 rounded-md border-2 flex flex-col">
          <div>
            <h2 className="text-sm font-medium">Details :</h2>
          </div>
          <Separator className="my-1"/>

          <div className="grid grid-cols-3 px-2 gap-2">
            <div className="col-span-1 text-left text-sm mt-2">
                <p>Count: </p>
                <p className="mt-2 ">Expenditure: </p>
            </div>
            <div className="col-span-2 mt-2">
                <p>{user?.websites.length} </p>
                <p className=" flex items-center justify-center">₹ {total}</p>
            </div>
          </div>
          <Separator className="mt-4"/>

          <div className="mt-1">
            <p className="text-sm">Your Preferences : </p>

            <div className="flex gap-1 flex-wrap items-center">
              {user?.websites.map(item => (
                <div key={item.category} className="bg-slate-800 rounded-md p-1 text-xs font-semibold">
                  {item.category}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3 p-2 rounded-md relative border">
          <div>
            <h2 className="text-sm font-medium">Your Websites :</h2>
          </div>
          <Separator className="my-1"/>

          <div className="w-full h-40 max-h-40 mt-2 mx-auto">
              <Card websites={websites ? websites : []}/>

              <div className="flex justify-end items-center">
                <p className="cursor-pointer font-semibold border-b-2 mr-2 text-sm" onClick={handle}>View All</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebsitesCard