"use client"

import { Button } from "@/components/ui/button"
import { DollarSign, Globe, Mail, User } from "lucide-react"
import Link from "next/link"
import CellAction from "../../../components/cell-action"
import { Timestamp } from "firebase/firestore"
import { format } from "date-fns"

interface InfoProps {
    website : {   
            id : string,
            name : string,
            price : number,
            url : string,
            owner : string,
            ownerId : string,
            category : string,
            images : {url : string}[],
            isFeatured : boolean,
            createdAt: Timestamp
    }
}

const Info = ({website} : InfoProps) => {

  function convertToDate(timestamp: { seconds: number; nanoseconds: number }): Date | null {
    if (timestamp && typeof timestamp.seconds === 'number' && typeof timestamp.nanoseconds === 'number') {
      return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    }
    return null;
  }

    let formattedDate = "";

    const createdAtDate = convertToDate(website.createdAt);
    if (createdAtDate) {
    formattedDate = format(createdAtDate, "MMMM do, yyyy");
    } else {
    console.error('createdAt is not a valid Firestore Timestamp:', website.createdAt);
    }

  return (
    <div>
        <h1 className="text-3xl font-bold flex items-center justify-between">{website.name} <CellAction data={website}/></h1>

        <div className="mt-3 flex items-end justify-between">
            <p>
                {formattedDate || "No Description" }
            </p>
        </div>

        <div className="w-full flex items-center justify-start gap-2 flex-wrap px-2 mt-8">
            {website.category && (
                <div className="rounded-md bg-blue-500/20 px-3 py-2 text-base font-semibold flex items-center gap-2">
                    {website.category}
                </div>
            )}
        </div>

        <div className="w-full grid grid-cols-4 my-12">
            <div className="col-span-1 space-y-8">
                <p className="text-lg flex items-center font-semibold"><DollarSign className="w-5 h-5  mr-2"/> Price</p>
                <p className="text-lg flex items-center font-semibold"><User className="w-5 h-5  mr-2"/> Owner</p>
                <p className="text-lg flex items-center font-semibold"><Mail className="w-5 h-5  mr-2"/> Email</p>
            </div>

            <div className="col-span-3 space-y-8">
                <p className="text-xl font-bold">₹{website.price}</p>
                <p className="text-xl font-bold">{website.owner}</p>                
                <p className="text-xl font-bold">{website.ownerId}</p>                
            </div>
        </div>

        <Link href={website.url}>
            <Button onClick={() => {}} className="w-full py-6 text-xl font-semibold flex items-center justify-center gap-3">
                <Globe className="w-5 h-5" />
                Visit
            </Button>
        </Link>
    </div>
  )
}

export default Info