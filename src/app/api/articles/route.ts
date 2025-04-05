import { NextRequest, NextResponse } from "next/server";
import { Articles } from "@/utils/data";
import { Article } from "@/utils/types";
import {z} from 'zod'
import { CreateArticleSchema } from "@/utils/validationSchemas";
import { CreateArticleDTO } from "@/utils/dtos";
//route handlers
/**
 * @method GET
 * @route ~/api/articles
 * @description GET all articles  
 * @access  public  
 */
export function GET(request: NextRequest) {
  return NextResponse.json(Articles, { status: 200 });
}

/**
 * @method POST
 * @access public
 * @route ~/api/articles
 * @description Create Articles
 */
export async  function POST(request:NextRequest) {
  //the body from json

  const body=await request.json() as CreateArticleDTO;

const validation=CreateArticleSchema.safeParse(body)
if(!validation.success){
  return NextResponse.json({message:validation.error.errors[0].message},{status:400})
}
 const newArticle:Article = {
  title:body.title,
  body:body.body,
  id:Articles.length + 1,
  userId:200

 }
 Articles.push(newArticle)
  return NextResponse.json(newArticle,{status:201})
  

}
