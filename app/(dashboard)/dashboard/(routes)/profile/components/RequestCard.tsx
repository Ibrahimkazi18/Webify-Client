"use client"

import { User } from "@/types-db"
import CustomActiveShapePieChart from "./graphs/RequestPieChart"

export interface ProfileCards {
    user : User | undefined
}

interface RequestCardProps {
    requests : number
    websites : number
}

const RequestCard = ({requests, websites} : RequestCardProps) => {

  return (
    <div className="rounded-md p-2 dark:bg-slate-900 bg-slate-200 w-full h-full flex flex-col text-center relative">
        <div>
            <h2 className="font-semibold text-lg">Requests</h2>
        </div>
        <div className="-mt-20 z-50">
            <CustomActiveShapePieChart requests={requests} websites={websites}/>
        </div>
    </div>
  )
}

export default RequestCard