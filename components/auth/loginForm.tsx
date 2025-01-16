"use client"
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import {z} from "zod"
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schema'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'


export const LoginForm = () => {

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        
    }



  return (
    <Card className='w-96 py-4 '>

        <CardContent className='flex flex-col gap-2'>
            <Button variant="secondary" className='w-full flex gap-2 items-center justify-center' >
                <FaGoogle />
                Continue with Google
            </Button>
            <Button variant="secondary" className='w-full flex gap-2 items-center justify-center' >
                <FaGithub />
                Continue with GitHub
            </Button>

            <Separator />

            <Form {...form}>
                <form className='mt-4'>
                    <div className='space-y-4'>
                        <FormField control={form.control} name='email' render={({field})=> (
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder='Email' type='email' {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='password' render={({field})=> (
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder='Password' type='password' {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <Button type='submit' className='w-full' variant="secondary">Sign in with Email</Button>


                    </div>

                </form>
            </Form>








        </CardContent>
    </Card>
  )
}

