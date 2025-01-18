"use server"
import { signIn } from "@/auth"
import { getUserByEmail } from "@/data/user"
import { LoginSchema } from "@/schema"
import { AuthError } from "next-auth"
import * as z from "zod"

export const login = async (values : z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: "Invalid Fields"}
    }

    const {email, password} = validatedFields.data

    const existingUser = await getUserByEmail(email)


    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error: "User does not Exist!"}
    }

    try{
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/"
        })

        return {success: "You have fucking made it bro"}
    }
    catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin": return {error: "Invalid Credentials"}
                default: return {error: "Something went wrong"}
            }
        }

        throw error
    }



}