"use client"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { ArrowDownNarrowWide, ArrowDownWideNarrow, MoreVertical } from "lucide-react"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { useUser } from "@clerk/nextjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { formatter } from "@/lib/utils"

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

  const {user} = useUser()

  const websitesData = data.filter(item => item.ownerId !== user?.primaryEmailAddress?.emailAddress)
  
  const [newData, setNewData] = useState(websitesData)
  const length = newData.length
  
  const cleanPriceString = (priceString : string) => {
    return parseFloat(priceString.replace(/[^\d.-]/g, ''));
  }
  
  const sortDataByPriceAscending = () => {
    const dataWithNumericPrice = newData.map(item => {
      const price = cleanPriceString(item.price);
      console.log(`Converting price for item ${item.id}: ${item.price} -> ${price}`);
      return {
        ...item,
        price: price
      };
    });

    const sortedData = dataWithNumericPrice.sort((a, b) => a.price - b.price);
    console.log("Sorted Data:", sortedData);

    const dataWithStringPrice = sortedData.map(item => ({
      ...item,
      price: formatter.format(item.price)
    }));

    console.log("Formatted Data:", dataWithStringPrice);

    // Update the state with the sorted data
    setNewData(dataWithStringPrice);
  }

  const sortDataByPriceDescending = () => {
    const dataWithNumericPrice = newData.map(item => {
      const price = cleanPriceString(item.price);
      console.log(`Converting price for item ${item.id}: ${item.price} -> ${price}`);
      return {
        ...item,
        price: price
      };
    });

    const sortedData = dataWithNumericPrice.sort((a, b) => b.price - a.price);
    console.log("Sorted Data:", sortedData);

    const dataWithStringPrice = sortedData.map(item => ({
      ...item,
      price: formatter.format(item.price)
    }));

    console.log("Formatted Data:", dataWithStringPrice);

    // Update the state with the sorted data
    setNewData(dataWithStringPrice);
  }

  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title={`Websites (${length})`} description="Explore websites made by Webify"/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="z-50">
                    <Button variant={"ghost"} className="h-8 flex justify-between gap-2 items-center">
                        <p>Filter Websites</p>
                        <MoreVertical className="h-4 w-4 z-50"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-50">
                    <DropdownMenuLabel>Filter By</DropdownMenuLabel>

                    <DropdownMenuItem onClick={sortDataByPriceAscending}>
                        <ArrowDownNarrowWide className="h-4 w-4 mr-2"/>
                        Price Low to High
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={sortDataByPriceDescending}>
                        <ArrowDownWideNarrow className="h-4 w-4 mr-2"/>
                        Price High to Low
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <Separator />

        <div className="max-w-6xl mx-auto px-8">
          <HoverEffect items={newData} />
        </div>

    </>
  )
}

export default WebsiteClient