import { z } from "zod";

export const CreateArticleSchema =z.object({
    title:z.string().min(2,"Title must be more than 2 characters").max(200),
    body:z.string().min(10,"Title must be more than 10 characters")
   })