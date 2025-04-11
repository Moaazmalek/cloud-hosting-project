import { z } from "zod";
import { CreateArticleFormSchema } from "./types";

//Data transfer Object
export  type CreateArticleDTO=z.infer<typeof CreateArticleFormSchema>;
export interface UpdateArticleDto {
    title?:string,
    description?:string
}
export interface RegisterUserDto {
    username:string,
    email:string,
    password:string,
    confirmPassword:string
}
export interface LoginUserDto {
    email:string,
    password:string
}
export interface UpdateUserDto {
    username?:string,
    email?:string,
    password?:string

}