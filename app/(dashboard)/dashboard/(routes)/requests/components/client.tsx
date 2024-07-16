"use client"

import Heading from "@/components/heading"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"

import { RequestColumn, columns } from "./columns"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

interface RequestClientProps  {
  data : RequestColumn[]
}

const RequestClient = ({ data } : RequestClientProps ) => {

  const {user} = useUser()

  const newData = data.filter(item => item.email === user?.primaryEmailAddress?.emailAddress)

  const router = useRouter()

  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title={`Requests (${data.length})`} description="Manage requests for your store"/>
            <Button onClick={() => router.push(`/dashboard/requests/create`)}>
                <Plus className="h-4 w-4 mr-2"/>
                Add New
            </Button>
        </div>

        <Separator />

        <DataTable columns={columns} data={newData} searchKey="name" />
    </>
  )
}

export default RequestClient