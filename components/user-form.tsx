"use client"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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
import { User } from "@/types-db"

interface UserFormProps {
  initialData ?: User;
  userId ?: string | null
}

const formSchema = z.object({
  name : z.string().min(1),
  email : z.string().min(1),
})

const UserForm = ({ initialData, userId  } : UserFormProps) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const params = useParams()
  const router = useRouter()

  const title = initialData ? "Edit User" : "Create User"
  const description = initialData ? "Edit a User" : "Add a new User"
  const toastMessage = initialData ? "User Updated" : "User Created"
  const action = initialData ? "Save Changes" : "Create User"

  const onSubmit = async (data : z.infer<typeof formSchema>) => {
    
    try {
      setIsLoading(true)

      if(initialData) {
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.userId}`, data);

        toast.success(toastMessage)
        router.refresh()
        router.push(`/dashboard/users`)

      } else {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, data);
      }

        toast.success(toastMessage)
        router.refresh()
        router.push(`/dashboard`)

    } catch (error) {
        toast.error("Something went wrong")
    } finally {
        router.refresh()
        setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.userId}`);
      

      toast.success("User Removed")
      router.refresh()
      router.push(`/dashboard`)

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

      <div className="flex items-center justify-center">
        <Heading title={title} description={description} />
        {initialData && (
            <Button disabled={isLoading} variant={"destructive"} size={"icon"} onClick={() => setOpen(true)}>
                <Trash className="w-4 h-4"/>
            </Button>
        )}
      </div>
      
      <Separator />

      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">


            <div className="grid grid-cols-2 mt-5 gap-8">
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input disabled={isLoading} placeholder="Your name..." {...field} />
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
                            <Input disabled={isLoading} placeholder="Your email..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
              )}
              />
            </div>

            <Button disabled={isLoading} type="submit" size={"sm"}>
              {action}
            </Button>
          </form>
      </Form>

    </>
  )
}

export default UserForm