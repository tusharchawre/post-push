"use client"
import React, { useState, useTransition } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schema'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { FormSuccess } from '../Form-success'
import { FormError } from '../Form-error'
import { login } from '@/actions/login'
import { signIn } from 'next-auth/react'


export const LoginForm = () => {

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const [isPending , startTransition ] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setSuccess("")
        setError("")

        startTransition(()=> {
            login(values)
            .then((data)=> {
                setSuccess(data?.success)
                setError(data?.error)
            })
        })

        

    }



  return (
    <Card className='w-96 py-4 '>

        <CardContent className='flex flex-col gap-2'>
            <Button onClick={()=>signIn("google")} variant="secondary" className='w-full flex gap-2 items-center justify-center' >
                <FaGoogle />
                Continue with Google
            </Button>
            <Button onClick={()=>signIn("github")} variant="secondary" className='w-full flex gap-2 items-center justify-center' >
                <FaGithub />
                Continue with GitHub
            </Button>

            <Separator />

            <Form {...form}>
                <form className='mt-4' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <FormField control={form.control} name='email' render={({field})=> (
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder='Email'
                                    disabled={isPending} 
                                    className='focus-visible:ring-0' type='email' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='password' render={({field})=> (
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder='Password'
                                    disabled={isPending}
                                    className='focus-visible:ring-0' type='password' {...field} />
                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )} />

                        <FormSuccess message={success} />
                        <FormError message={error} />

                        <Button type='submit' 
                        disabled={isPending}
                        className='w-full' variant="secondary">Sign in with Email</Button>
                    </div>

                </form>
            </Form>








        </CardContent>
    </Card>
  )
}

