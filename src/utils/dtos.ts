import { z } from "zod";
import { CreateArticleFormSchema } from "./types";

//Data transfer Object
export  type CreateArticleDTO=z.infer<typeof CreateArticleFormSchema>;
export interface UpdateArticleDto {
    title?:string,
    body?:string
}