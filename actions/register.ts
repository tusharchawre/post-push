"use server"
import { getUserByEmail } from "@/data/user"
import { prisma } from "@/prisma"
import { RegisterSchema } from "@/schema"
import * as z from "zod"
import bcrypt from "bcryptjs"


export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: "Invalid Fields"}
    }   

    const { email, password, user } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(existingUser){
        return {error: "User already exists!"}
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name: user
        }
    })

    

    return {success : "You are registered succesfully!"}
}