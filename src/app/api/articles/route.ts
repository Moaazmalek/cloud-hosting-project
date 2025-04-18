import { NextRequest, NextResponse } from "next/server";
import { Article } from "@/utils/types";
import { z } from "zod";
import { CreateArticleSchema } from "@/utils/validationSchemas";
import { CreateArticleDTO } from "@/utils/dtos";
import { db } from "@/lib/database/db";
import { ArticleTable } from "@/lib/drizzle/schema";
import { verifyToken } from "@/utils/verifyToken"; 
//route handlers
/**
 * @method GET
 * @route ~/api/articles
 * @description GET articles by page number
 * @access  public
 */
export async function GET(request: NextRequest) {
  try {
    const pageNumber=request.nextUrl.searchParams.get("pageNumber") || "1"
    const pageSize=6;
    const offset=(parseInt(pageNumber) - 1) * pageSize;
    
    const articles:Article[]=await db.query.ArticleTable.findMany({
      limit:pageSize,
      offset
    })
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
    const user=verifyToken(request);
    if(!user) {
      return NextResponse.json({message:"not allowed, access denied"},{status:401})
    }
    const body=await request.json() as CreateArticleDTO;

const validation=CreateArticleSchema.safeParse(body)
if(!validation.success){
  return NextResponse.json({message:validation.error.errors[0].message},{status:400})
}
 const newArticle=await db.insert(ArticleTable).values({
  title:body.title,
  description:body.description,
  userId:user.id
 }).returning() 
 return NextResponse.json({newArticle:newArticle[0]}, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({message:"Internal server error"},{status:500})
  }

 
}
