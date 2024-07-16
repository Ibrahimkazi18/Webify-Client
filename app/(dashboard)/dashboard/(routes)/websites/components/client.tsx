"use client"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { useUser } from "@clerk/nextjs"

export interface WebsiteCardProps {
    id : string,
    name : string,
    url : string,
    ownerId : string, 
    owner : string,
    category : string,
    price : string,
    images : {url : string}[], 
    isFeatured: boolean,
    createdAt?: string,
}

interface WebsiteClientProps  {
  data : WebsiteCardProps[]
}

const WebsiteClient = ({ data } : WebsiteClientProps ) => {

  const router = useRouter()
  const {user} = useUser()
  
  const newData = data.filter(item => item.ownerId === user?.primaryEmailAddress?.emailAddress)
  const length = newData.length
  

  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title={`Your Websites (${length})`} description="Manage your websites"/>
            <Button onClick={() => router.push(`/dashboard/requests`)}>
                <Plus className="h-4 w-4 mr-2"/>
                Add New
            </Button>
        </div>

        <Separator />

        <div className="max-w-6xl mx-auto px-8">
          <HoverEffect items={newData} />
        </div>

    </>
  )
}

export default WebsiteClient