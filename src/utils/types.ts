import { z } from "zod";

export type Article = {
    userId: number;
    id: number;
    title: string;
    body: string;
  };


export const LoginSchema=z.object({
  email:z.string().describe("Email").email({message:"Invalid Email"}).min(3,{message:"Email is required"}),
  password:z.string().describe("Password").min(6,"Password must be at least 6 charactesr")
})
export const RegisterSchema=z.object({
  username:z.string().describe("User name").min(1,{message:"user name is required"}),
  email:z.string().describe("Email").email({message:"Invalid Email"}).min(3,{message:"Email is required"}),
  password:z.string().describe("Password").min(6,"Password must be at least 6 charactesr"),
  confirmPassword:z.string().describe("Confirm Password").min(6,{message:"Password must be 6 characters at least"})
}).refine(data  => data.password === data.confirmPassword,{
  message:"Password don't match.",
  path:['confirmPassword']
})
export const CreateArticleFormSchema =z.object({
  title:z.string().describe("Title").min(1,{message:"Title is required"}),
  body:z.string().describe("Title").min(1,{message:"Description is required"}),
})

