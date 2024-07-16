"use client"

import { convertToDate } from "@/lib/utils"
import { Website } from "@/types-db"
import { format } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface CardProps {
    websites : Website[]
}

const Card = ({websites} : CardProps) => {

    const [first, setFirst] = useState(false)
    useEffect(() => {
        setFirst(true)
    } ,[first])

    const router = useRouter()     

    const handle = (id : string) => {
        router.push(`/dashboard/websites/${id}/more`)
    }

  return (
    <div className="grid grid-cols-3 gap-2 h-full">
        {websites.map((item, i) => (
            <div key={item.id} className={`p-2 flex-col h-full rounded-md ${i === 1 ? `bg-slate-800` : `border`}` }>
                <h2 className="font-semibold text-base">{item.name}</h2>

                <p className="text-xs text-left mt-4" >Category : {item.category}</p>
                <p className="text-xs text-left mt-1" >Price : ₹{item.price}</p>
                <p className="text-xs text-left mt-1" >Url : <Link href={item.url}>Click Here!</Link></p>
                <p className="text-xs text-left mt-1" >Created : {format(convertToDate(item.createdAt)!, "MMMM do, yyyy")}</p>

                <p className="text-xs mt-2 font-semibold underline-offset-2 ml-auto cursor-pointer" onClick={() => handle(item.id)}>View More!</p>
            </div>
        ))}
    </div>
  )
}

export default Card