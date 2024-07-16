"use client"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import axios from "axios"
import toast from "react-hot-toast"
import { AlertModal } from "@/components/modal/alert-modal"
import { Request } from "@/types-db"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@clerk/nextjs"

interface RequestFormProps {
  requestsData : Request[];
}

const formSchema = z.object({
  name : z.string().min(1),
  email : z.string().min(1),
  type : z.string().min(1),
  copyId : z.string(),
  price : z.coerce.number().min(1),
})

const RequestForm = ({ requestsData  } : RequestFormProps) => {
  const {user} = useUser()
  const initialData = requestsData.find(item => item.email === user?.primaryEmailAddress?.emailAddress)
  const [typePrice, setTypePrice] = useState<number>(initialData?.price || 0)
  const [selectedType, setSelectedType] = useState<string>(initialData?.type || '')

  const types = [
    { name: "E-Commerce", price: 2000 },
    { name: "Landing-Page", price: 800 },
    { name: "Non-Profit", price: 1000 },
    { name: "Restaurant", price: 1500 },
    { name: "Blog/News", price: 1200 },
    { name: "Portfolio", price: 1000 },
  ]

  useEffect(() => {
    const selectedTypeData = types.find(type => type.name === selectedType)
    if (selectedTypeData) {
      setTypePrice(selectedTypeData.price)
      form.setValue('price', selectedTypeData.price)
    }
  }, [selectedType])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      price: typePrice,
      email: "",
      type: "",
      copyId: "",
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const params = useParams()
  const router = useRouter()

  const title = initialData ? "Edit Requests" : "Create Requests"
  const description = initialData ? "Edit a Requests" : "Add a new Requests [The request cannot be edited]"
  const toastMessage = initialData ? "Requests Updated" : "Requests Created"
  const action = initialData ? "Save Changes" : "Create Requests"

  const onSubmit = async (data : z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      if(initialData) {
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/requests/${params.requestId}`, data);
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/requests`, data);
      }

      toast.success(toastMessage)
      router.refresh()
      router.push(`/dashboard/requests`)
    } catch (error) {
        toast.error("Something went wrong")
    } finally {
        setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/requests/${params.requestId}`);

      toast.success("Website Removed")
      router.refresh()
      router.push(`/dashboard/requests`)
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
            <div className="grid grid-cols-3 gap-8">
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input disabled={isLoading} placeholder="Website name..." {...field} />
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
              <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                              disabled={isLoading}
                              onValueChange={(value) => {
                                field.onChange(value)
                                setSelectedType(value)
                              }}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    defaultValue={field.value}
                                    placeholder="Select a type"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {types.map((type, i) => (
                                  <SelectItem key={i} value={type.name}>
                                    {type.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                        <FormMessage />
                      </FormItem>
              )}
              />
              <FormField
                  control={form.control}
                  name="copyId"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website Id</FormLabel>
                        <FormControl>
                            <Input disabled={isLoading} placeholder="Id of the website you want to remake..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
              )}
              />
              <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input disabled={true} value={`₹${typePrice}`} />
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

export default RequestForm
