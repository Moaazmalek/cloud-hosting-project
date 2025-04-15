import { NextRequest, NextResponse } from "next/server";
import { Article } from "@/utils/types";
import { z } from "zod";
import { CreateArticleSchema } from "@/utils/validationSchemas";
import { CreateArticleDTO } from "@/utils/dtos";
import { db } from "@/lib/database/db";
import { ArticleTable } from "@/lib/drizzle/schema";
//route handlers
/**
 * @method GET
 * @route ~/api/articles
 * @description GET all articles
 * @access  public
 */
export async function GET(request: NextRequest) {
  try {
    const articles:Article[]=await db.query.ArticleTable.findMany()
   if(!articles) {
    return NextResponse.json({message:"articles not found"},{status:404})
   }
    return NextResponse.json(articles, { status: 200 });

  }catch(error) {
    console.log(error)
   return NextResponse.json({message:"internal server error"},{status:500}) 
  }
 
}

/**
 * @method POST
 * @access public
 * @route ~/api/articles
 * @description Create Articles
 */
export async function POST(request: NextRequest) {
  //the body from json

  try {
    const body=await request.json() as CreateArticleDTO;

const validation=CreateArticleSchema.safeParse(body)
if(!validation.success){
  return NextResponse.json({message:validation.error.errors[0].message},{status:400})
}
 const newArticle=await db.insert(ArticleTable).values({
  title:body.title,
  description:body.description,
  userId:1
 }).returning() 
 return NextResponse.json({newArticle:newArticle[0]}, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({message:"Internal server error"},{status:500})
  }

 
}
