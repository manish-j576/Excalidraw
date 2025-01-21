import {z} from "zod";

export const CreateUserSchema = z.object({
    username:z.string().min(3).max(200),
    password : z.string().min(3).max(20),
    firstname:z.string().min(1).max(200),
    lastname : z.string().max(200)
})

export const SigninSchema = z.object({
    username : z.string().min(3).max(200),
    password: z.string().min(3).max(20)
})


export const CreateRoomSchema = z.object({
    room : z.string().min(3).max(6)
})