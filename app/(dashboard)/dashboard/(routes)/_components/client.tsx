"use client"

import { getGraphWebsiteMembership } from "@/actions/get-graph-website-membership"
import { getGraphTotalRevenue, getRevenueCategory } from "@/actions/get-graph-website-monthly"
import BarGraph from "@/components/overview-graph"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatter } from "@/lib/utils"
import { Membership, User, Website } from "@/types-db"
import { useUser } from "@clerk/nextjs"
import { IndianRupee } from "lucide-react"

interface ClientProps {
    users : User[],
    websites: Website[],
    memberships : Membership[],
    params : string
}

const OverviewClient = ({ users, params, websites, memberships } : ClientProps) => {

  const { user } = useUser()

  const profileUser = users.find(item => item.email === user?.primaryEmailAddress?.emailAddress)
  const profileWebsites = websites.filter(item => item.ownerId === profileUser?.email)
  const profileMemberships= memberships.filter(item => item.userId === profileUser?.email)
  
  const websiteRevenue = profileWebsites.reduce((total, website) => total + website.price, 0)
  const membershipRevenue = profileMemberships.reduce((total, memberhsips) => total + memberhsips.totalAmount, 0)
  const total = websiteRevenue + membershipRevenue

  const monthlyWebsite = getGraphTotalRevenue(profileWebsites)
  const websiteMembership = getGraphWebsiteMembership(websiteRevenue, membershipRevenue)
  const categoryRevenue = getRevenueCategory(profileWebsites)
  console.log(categoryRevenue)

  return (
    <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-2">
            <CardHeader className="flex items-center justify-between flex-row">
                <CardTitle className="text-sm font-medium">Total Expenditure</CardTitle>
                <IndianRupee className="w-4 h-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatter.format(total)}</div>
            </CardContent>
        </Card>

        <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between flex-row">
                <CardTitle className="text-sm font-medium">Website Expenditure</CardTitle>
                <IndianRupee className="w-4 h-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatter.format(websiteRevenue)}</div>
            </CardContent>
        </Card>

        <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between flex-row">
                <CardTitle className="text-sm font-medium">Memberhsip Expenditure</CardTitle>
                <IndianRupee className="w-4 h-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatter.format(membershipRevenue)}</div>
            </CardContent>
        </Card>

        <Card className="col-span-3">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">Expenditure By Month</CardTitle>
            </CardHeader>
            <CardContent>
              <BarGraph data={monthlyWebsite}/>
            </CardContent>
        </Card>

        <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">Expenditure Website vs Membership</CardTitle>
            </CardHeader>
            <CardContent>
              <BarGraph data={websiteMembership}/>
            </CardContent>
        </Card>

        <Card className="col-span-2">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">Expenditure By Website Category</CardTitle>
            </CardHeader>
            <CardContent>
              <BarGraph data={categoryRevenue}/>
            </CardContent>
        </Card>
    </div>
  )
}

export default OverviewClient