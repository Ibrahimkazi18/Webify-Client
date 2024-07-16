"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Copy, MoreVertical, Share } from "lucide-react"
import toast from "react-hot-toast"
import { Website } from "@/types-db"
import ShareButton from "@/components/ShareButton"

interface CellActionProps {
    data : Website
}

const CellAction = ({ data } : CellActionProps) => {

  const onCopy = (id : string) => {
    navigator.clipboard.writeText(id)
    toast.success("Website Id Copied to Clipboard")
  }

  return (
    <>

        <DropdownMenu>
            <DropdownMenuTrigger asChild className="z-50">
                <Button variant={"ghost"} className="h-8 w-8 p-0">
                    <span className="sr-only">Open</span>
                    <MoreVertical className="h-4 w-4 z-50"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-50">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onCopy(data.id)}>
                    <Copy className="h-4 w-4 mr-2"/>
                    Copy Id
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Share className="h-4 w-4 mr-2"/>
                    <ShareButton 
                        title={data.name}
                        text={`Visit ${data.owner}'s ${data.category} website made by Webify!`}
                        url={data.url}
                    />
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default CellAction