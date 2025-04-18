import { z } from "zod";

export const CreateArticleSchema =z.object({
    title:z.string({
        required_error:"title is required",
        invalid_type_error:"title should be of type string"
    }).min(2,"Title must be more than 2 characters").max(200),
    description:z.string({required_error:"description is required"}).min(10,"Title must be more than 10 characters")
   })
export const  ValidateLoginSchema=z.object({
    email:z.string().min(3).max(200).email(),
    password:z.string().min(6)
})
export const CreateCommentSchema = z.object({
    text:z.string().min(2).max(500),
    articleId:z.number(),
})
export const updatedUserSchema=z.object({
    username:z.string().min(3).max(100).optional(),
    email:z.string().min(3).max(200).email().optional(),
    password:z.string().min(6).optional()
})