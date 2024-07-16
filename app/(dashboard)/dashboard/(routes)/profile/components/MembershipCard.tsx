"use client"

import { useEffect, useState } from "react"
import { ProfileCards } from "./RequestCard"
import { format } from "date-fns"
import { Separator } from "@/components/ui/separator"
import { TextGenerateEffect } from "@/components/ui/typewritter-effect"
import { Calendar } from "@/components/ui/calendar"

interface MembershipClockProps {
    endDate: Date;
}
const MembershipCard = ({user} : ProfileCards) => {

  const startDate = {
    seconds : user?.membership?.startDate.seconds,
    nanoseconds : user?.membership?.startDate.nanoseconds,
  }
  const endDate = {
    seconds : user?.membership?.endDate.seconds,
    nanoseconds : user?.membership?.endDate.nanoseconds,
  }

  useEffect(() => {
    const hello = ""
  }, [])


  let formattedStart = "";
  let formattedEnd = "";

  function convertToDate(timestamp: { seconds: number | undefined; nanoseconds: number | undefined }): Date | null  {
    if (timestamp && typeof timestamp.seconds === 'number' && typeof timestamp.nanoseconds === 'number') {
      return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    }
    return null;
  }

    const start = convertToDate(startDate);
    if (start) {
    formattedStart = format(start, "MMMM do, yyyy");
    } 
    
    const end = convertToDate(endDate);
    if (end) {
    formattedEnd = format(end, "MMMM do, yyyy");
    } 

    const today = new Date()
    const daysLeft = Math.ceil((end?.getTime()! - today.getTime()) / (1000 * 60 * 60 * 24))
    
    const words = `Thank you for becominng a Member!`

        const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number, seconds : number }>({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds : 0,
        });
      
        useEffect(() => {
          const calculateTimeLeft = () => {
            const now = new Date();
            const timeDifference = end?.getTime()! - now.getTime();
      
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / (1000));
      
            setTimeLeft({ days, hours, minutes, seconds });
          };
      
          calculateTimeLeft();
          const intervalId = setInterval(calculateTimeLeft, 1000); // Update every second 60000 for minute 
      
          return () => clearInterval(intervalId);
        }, [end]);


  return (
    <div className="rounded-md p-2 dark:bg-slate-900 bg-slate-200 w-full h-full flex flex-col text-center">
        
        <div>
            <h2 className="font-semibold text-lg">Membership</h2>
        </div>
        <div className="grid grid-cols-6 grid-rows-2 gap-2 h-full">
            
            <div className="col-span-2 row-span-2 border-2 w-full h-full p-2 rounded-md flex-col">
                <div>
                    <h2 className="text-sm font-medium">Your Plan : </h2>
                </div>
                <Separator className="my-1" />
                <div className="rounded-md bg-slate-800">
                    <TextGenerateEffect words={words} className="mb-1 -mt-2"/>
                </div>
                
                <div className="grid grid-cols-3">
                    <div className="col-span-1 grid-rows-3 text-left text-sm mt-2">
                        <p className="my-2 row-span-1">Name: </p>
                        <p className="my-2 row-span-1">Duration: </p>
                        <p className="my-2 row-span-1">Amount: </p>
                    </div>
                    <div className="col-span-2 grid-rows-3 mt-2">
                        <p className="my-1 row-span-1">{user?.membership?.plan} </p>
                        <p className="my-1 row-span-1">{user?.membership?.duration} Months</p>
                        <p className="my-1 row-span-1">₹ {user?.membership?.totalAmount}</p>
                    </div>
                </div>
            </div>

            <div className="col-span-3 row-span-1 border-2 w-full h-full p-2 rounded-md">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-sm font-medium">Time Left :</h2>
                    <Separator className="my-1"/>

                    <div className="mt-2 mx-2 grid grid-cols-4 gap-2">
                        <div className="col-span-1 border rounded-md text-lg py-2 px-2 flex items-center justify-center flex-col">
                            <p>{timeLeft.days}</p>
                            <p className="text-xs">Days</p>
                        </div>
                        <div className="col-span-1 border rounded-md text-lg py-2 px-2 flex items-center justify-center flex-col">
                            <p>{timeLeft.hours}</p>
                            <p className="text-xs">Hours</p>
                        </div>
                        <div className="col-span-1 border rounded-md text-lg py-2 px-2 flex items-center justify-center flex-col">
                            <p>{timeLeft.minutes}</p>
                            <p className="text-xs">Minutes</p>
                        </div>
                        <div className="col-span-1 border rounded-md text-lg py-2 px-2 flex items-center justify-center flex-col">
                            <p>{timeLeft.seconds}</p>
                            <p className="text-xs">Seconds</p>
                        </div>
                           
                    </div>
                </div>
            </div>

            <div className="col-span-1 row-span-1 border-2 w-full h-full p-2 rounded-md">

            </div>


            <div className="flex flex-1 gap-1 col-span-4 row-span-1 w-full h-full rounded-md">
                <div className="rounded-md border p-2 w-full">
                    <h2 className="text-sm font-medium">Start Date :</h2>
                    <Separator className="my-1"/>
                    <p className="mt-3 text-center">{formattedStart}</p>
                </div>
                <div className="rounded-md border p-2 w-full">
                    <h2 className="text-sm font-medium">End Date :</h2>
                    <Separator className="my-1"/>
                    <p className="mt-3 text-center">{formattedEnd}</p>
                </div>
                <div className="rounded-md p-2 w-full bg-slate-800 flex flex-col items-center justify-center">
                    <p className="font-semibold text-4xl">{daysLeft}</p>
                    <h2 className="text-sm font-medium">Days Left</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MembershipCard