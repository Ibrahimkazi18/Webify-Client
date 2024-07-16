import { db } from "@/lib/firebase"
import { auth } from "@clerk/nextjs/server"
import { collection, doc, getDocs, query, where } from "firebase/firestore"
import { redirect } from "next/navigation"
import { Store } from "@/types-db"
import Navbar from "@/components/navbar"

interface DashoardLaoutProps {
    children: React.ReactNode,
    params : {storeId: string}
}

const DashboardLayout = async ({ children, params } : DashoardLaoutProps) => {

    const {userId} = auth()

    if(!userId){
        redirect("/sign-in")
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )}
export default DashboardLayout

//npm install -g npm@10.8.1