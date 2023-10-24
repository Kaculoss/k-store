"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import useCart from "@/hooks/use-cart"
import Button from "@/components/ui/button"
import Currency from "@/components/ui/currency"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  fullName: z.string().min(2),
  email: z.coerce.string().email().min(5),
  phone: z.coerce.string().min(10).max(13),
  country: z.string().min(2),
  city: z.string().min(2),
  address: z.string().min(1),
})

type SummaryFormValues = z.infer<typeof formSchema>

const Summary = () => {
  const [isLoading, setIsLoading] = useState(false)

  const searchParams = useSearchParams()
  const items = useCart((state) => state.items)
  const removeAll = useCart((state) => state.removeAll)

  const form = useForm<SummaryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      address: "",
    },
  })

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.")
      removeAll()
    }

    if (searchParams.get("cancelled")) {
      toast.error("Payment was not successfull.")
      removeAll()
    }
  }, [removeAll, searchParams])

  const totalPrice = items.reduce(
    (total, current) => (total += Number(current.price)),
    0
  )

  const onSubmit = async (data: SummaryFormValues) => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
          ...data,
        }
      )
      console.log("response =>", response)
      window.location = response.data.data.authorization_url
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data)
      } else {
        toast.error("Something went wrong.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-12">
          <h2 className="text-base font-bold text-gray-900 text-center">
            Address
          </h2>
          <div className="w-full mt-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading || items.length < 1}
                      placeholder="Full Name"
                      {...field}
                    />
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
                  <FormControl>
                    <Input
                      type="email"
                      disabled={isLoading || items.length < 1}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="tel"
                      disabled={isLoading || items.length < 1}
                      placeholder="Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading || items.length < 1}
                      placeholder="Country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading || items.length < 1}
                      placeholder="City"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading || items.length < 1}
                      placeholder="Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isLoading || items.length < 1}
            className="w-full mt-6"
            type="submit"
          >
            Checkout
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Summary
