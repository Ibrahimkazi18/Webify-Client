"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

const MainNav = ({className, ...props} : React.HtmlHTMLAttributes<HTMLElement>) => {

    const pathname = usePathname()
    const params = useParams()

    const routes = [
        {
            href : `/dashboard`,
            label : "Overview",
            active : pathname === `/dashboard`,
        },
        {
            href : `/dashboard/websites`,
            label : "Websites",
            active : pathname === `/dashboard/websites`,
        },
        {
            href : `/dashboard/browse`,
            label : "Browse",
            active : pathname === `/dashboard/browse`,
        },
        {
            href : `/dashboard/requests`,
            label : "Requests",
            active : pathname === `/dashboard/requests`,
        },
        {
            href : `/dashboard/membership`,
            label : "Membership",
            active : pathname === `/dashboard/membership`,
        },
        {
            href : `/dashboard/profile`,
            label : "Profile",
            active : pathname === `/dashboard/profile`,
        },
        {
            href : `/dashboard/settings`,
            label : "Settings",
            active : pathname === `/dashboard/settings`,
        },
    ]


    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6 pl-6")}>
            {routes.map(route => (
                <Link key={route.href}
                      href={route.href} 
                      className={cn("text-sm font-medium transition-colors hover:text-primary",
                                    route.active ? "text-black dark:text-white" : "text-muted-foreground")}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}

export default MainNav