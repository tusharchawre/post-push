import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid Email"
    }),
    password: z.string().min(1 , {
        message: "Password is Required"
    })

})


export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Invalid Email"
    }),
    password: z.string()
    .min(6,{
        message: "Minimum 6 character required!"
    })
    .max(32, {
        message: "Must not exceed 32 characters!"
    })
    .regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'), 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
    user: z.string().min(1, {
        message: "Please enter your name"
    })


})