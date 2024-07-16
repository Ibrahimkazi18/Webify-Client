"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import axios from "axios"
import toast from "react-hot-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SubscriptionPlan } from "@/types-db"
import { useUser } from "@clerk/nextjs"
import QRCode from "qrcode"
import { QrModal } from "@/components/modal/qr-modal"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  duration : z.coerce.number().min(1),
  totalAmount : z.coerce.number(),
  plan : z.string().min(1),

})

const MembershipForm = () => {

    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [src, setSrc] = useState<string>('')

    useEffect(() => {
        // Fetch subscription plans from admin API
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/subscribtion-plans`)
          .then(response => setPlans(response.data))
          .catch(error => console.error('Error fetching plans:', error));
      }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: "",
      totalAmount: 0,
      duration : 0,
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [duration, setDuration] = useState<number>()
  const [planDescription, setPlanDescription] = useState<string | undefined>('')
  const [totalDisplay, setTotalDisplay] = useState<number | undefined>()
  const router = useRouter()
  const { user } = useUser();

  useEffect(() => {
    const selectedPlan = plans.find(plan => plan.name === form.watch('plan'));
    setPlanDescription(selectedPlan?.description);

  }, [form.watch('plan'), plans])

  useEffect(() => {
    const selectedPlan = plans.find(plan => plan.name === form.watch('plan'));
    setDuration(form.watch('duration'))
    const total = selectedPlan?.price! * duration!
    setTotalDisplay(total)

  }, [form.watch('duration'), plans, duration])

  const toastMessage = "QrCode Created" 
  const action = "Generate QR"

  const onSubmit = async (data : z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      const selectedPlan = plans.find(plan => plan.name === data.plan);
      if (!selectedPlan) return;

      const total = selectedPlan.price * data.duration;
      setTotalAmount(total);

    // Generate UPI payment URL
      const paymentUrl = encodeURI(`upi://pay?pa=ibirfkazi@okicici&pn=IbrahimKazi&am=${total}&cu=INR&tn=Membership Payment`);
      console.log(paymentUrl)

      await QRCode.toDataURL(`${paymentUrl}`).then(setSrc)

      toast.success(toastMessage)
      setOpen(true)

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/membership`, {
            userId: user?.primaryEmailAddress?.emailAddress,
            plan: data.plan,
            duration: data.duration,
            totalAmount: total,
        })
      router.refresh()
    //   router.push(`/${params.storeId}/membership`)

    } catch (error) {
        toast.error("Something went wrong")
    } finally {
        router.refresh()
        setIsLoading(false)
    }
  }

  const alertConfirm = () => {
    setOpen(false)
    toast.success("Thank You! We will reach out to you shortly")
    router.refresh()
  }

  return (
    <>
      <QrModal
        isOpen={open}
        onClose={() => {setOpen(false)}}
        onConfirm={alertConfirm}
        loading={isLoading}
        src={src}
        total={totalAmount}
      />

      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">


            <div className="grid grid-cols-3 gap-8">
              <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <Input disabled={isLoading} placeholder="Membership plan..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
              )}
              />
              <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Membership Plan</FormLabel>
                        <Select
                              disabled={isLoading}
                              onValueChange={(value) => {
                                field.onChange(value)
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
                                {plans.map((plan, i) => (
                                  <SelectItem key={i} value={plan.name}>
                                    {plan.name} - ₹{plan.price}/month
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
                  name="duration"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <Select
                              disabled={isLoading}
                              onValueChange={(value) => {
                                field.onChange(value)
                              }}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    defaultValue={field.value}
                                    placeholder="Select duration of membership"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[3,6,12].map((i) => (
                                  <SelectItem key={i} value={`${i}`}>
                                    {i}-months
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                        <FormMessage />
                      </FormItem>
              )}
              />    
                {planDescription && (
                    <>
                        <div className="col-span-1">
                        <Button disabled={isLoading} type="submit" size={"sm"}>
                            {action}
                        </Button>
                        </div>
                        <div className="col-span-1 border rounded-md p-4">
                            <h2 className="font-semibold mb-2">Plan Description</h2>
                            <Separator />
                            <ul className="">
                                {planDescription?.split('.').map(item => item.trim()).filter(item => item).map((item, index) => (
                                    <li className="my-2" key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-1 ">
                            <h2 className="border rounded-md font-semibold p-4 ">Total Amount : {totalDisplay! > 0 ? `₹${totalDisplay}` : ""}</h2>
                        </div>  
                    </>
                )}
            </div>


            {planDescription ? "" : (
                <Button disabled={isLoading} type="submit" size={"sm"}>
                    {action}
                </Button>
            )}
          </form>
      </Form>

    </>
  )
}

export default MembershipForm