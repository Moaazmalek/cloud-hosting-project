import { db } from "@/lib/database/db";
import { ArticleTable } from "@/lib/drizzle/schema";
import { count } from "drizzle-orm";
import { NextRequest,NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/articles/count
 * @description GET articles count
 * @access  public
 */
export async function GET(request:NextRequest) {
    try {
        const result=await db.select({count:count()}).from(ArticleTable)
        let articlesCount=result[0] as any
        return NextResponse.json(articlesCount,{status:200})

    }catch(error) {
        return NextResponse.json({message:"internal server error"},{status:200})
    }
    
} 
