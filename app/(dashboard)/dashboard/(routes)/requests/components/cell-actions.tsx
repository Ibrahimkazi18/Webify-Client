"use client"

import { useParams, useRouter } from "next/navigation"
import { RequestColumn } from "./columns"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { AlertModal } from "@/components/modal/alert-modal"

interface CellActionProps {
    data : RequestColumn
}

const CellAction = ({ data } : CellActionProps) => {

  const router = useRouter()
  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
 
  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/${params.storeId}/requests/${data.id}`);
      

      toast.success("Request Removed")
      router.refresh()
      router.push(`/${params.storeId}/requests`)

    } catch (error) {
        toast.error("Something went wrong")
    } finally {
        router.refresh()
        setIsLoading(false)
        setOpen(false)
    }
  }


  return (
    <>
        <AlertModal
            isOpen={open}
            onClose={() => {setOpen(false)}}
            onConfirm={onDelete}
            loading={isLoading}
        />

        
        <Button variant={"ghost"} className="h-8 w-8 p-0 fle items-center justify-center">
            <Trash className="h-4 w-4" onClick={() => setOpen(true)}/>
        </Button>
    </>
  )
}

export default CellAction