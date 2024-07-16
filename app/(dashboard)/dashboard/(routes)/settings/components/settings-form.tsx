"use client"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { User } from "@/types-db"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import axios from "axios"
import toast from "react-hot-toast"
import { AlertModal } from "@/components/modal/alert-modal"
import { useUser } from "@clerk/nextjs"

interface SettingsFormProps {
  users : User[]
}

const formSchema = z.object({
  name: z.string().min(3, {message: "Store name should be minimum 3 characters"}),
  email: z.string().min(3, {message: "Store email should be minimum 3 characters"}),
})

const SettingsForm = ({ users } : SettingsFormProps) => {

  const {user} = useUser()

  const initialData = users.find(item => item.email === user?.primaryEmailAddress?.emailAddress)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const onSubmit = async (data : z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      const userId = initialData?.id

      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/${initialData?.id}`, {
        data,
        userId
      });
      toast.success("User Updated")
      router.refresh()
    } catch (error) {
        toast.error("Something went wrong")
    } finally {
        setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      const userId = initialData?.id

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${initialData?.id}`);

      toast.success("User Removed")
      router.refresh()
      router.push("/dashboard")
    } catch (error) {
        toast.error("Something went wrong")
    } finally {
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

      <div className="flex items-center justify-center">
        <Heading title="Settings" description="Manage User Details" />
      </div>
      
      <Separator />

      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
            <div className="grid grid-cols-3 gap-8">
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                          <Input disabled={isLoading} placeholder={initialData?.name} {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
              )}
              />
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                          <Input disabled={isLoading} placeholder={initialData?.email} {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
              )}
              />
            </div>

            <Button disabled={isLoading} type="submit" size={"sm"}>
              Save Changes
            </Button>
          </form>
      </Form>
    </>
  )
}

export default SettingsForm