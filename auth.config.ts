import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { LoginSchema } from "./schema"
import { getUserByEmail } from "./data/user"
 
export default { 
    providers: [Google, GitHub ,  Credentials({
        async authorize(credentials){
            const validatedFields = LoginSchema.safeParse(credentials)

            if(validatedFields.success){
                const {email, password} = validatedFields.data
                
                const user  = await getUserByEmail(email)

                if(!user || !user.password) return null;

                const passwordMatch = await bcrypt.compare(password, user.password)

                if(passwordMatch){
                    return user
                }



            }
            return null
        }
    })],
    


} satisfies NextAuthConfig