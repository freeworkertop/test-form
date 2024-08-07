"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

const formSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().min(2).email(),
  amount: z.string(),
});
export function TestFormDemo({ title }: { title: string }) {
  const [location, setLocation] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      amount: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const fetchPosition = async (lat: number, lon: number) => {
    axios(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=01ac443a9b6541f29c8241f2a3c7b043`
    ).then((resp) => {
      setLocation(resp?.data?.features?.[0]?.properties?.country);
    });
  };
  useEffect(() => {
    // Ensure the code runs only on the client-side
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //   fetchPosition()
          fetchPosition(position.coords.latitude, position.coords.longitude);
        },
        (err) => {}
      );
    }
  }, []);

  return (
    <div className="min-w-[400px] rounded-xl bg-yellow pb-4">
      <div className="flex h-full flex-col items-center gap-6 rounded-xl bg-white px-4 py-16">
        <span className="text-2xl text-black">Pledge Your Salawat</span>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex- flex w-full flex-col gap-[4px]">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter Your Pledge Amount" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              PLEDGE
            </Button>
          </form>
        </Form>
        <div className="flex flex-col">
          <span className="text-sm font-[700] uppercase">location: {location ? location : "Not defined"}</span>
          <Link className="text-sm font-[600] text-green" href={"/"}>
            Wrong location?
          </Link>
          <span className="text-[10px] text-slate-600">
            If your location still incorrect, please fill out{" "}
            <Link className="font-[600] text-green" href="/">
              this form
            </Link>{" "}
            and then submit your pledge.
          </span>
          <span className="text-[10px] text-slate-600">Well update the details for your pledge within 24 hours.</span>
        </div>
      </div>
    </div>
  );
}
