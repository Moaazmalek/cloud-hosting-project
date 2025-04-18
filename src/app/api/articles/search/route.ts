import { db } from '@/lib/database/db';
import { ArticleTable } from '@/lib/drizzle/schema';
import { eq, ilike } from 'drizzle-orm';
import {NextRequest,NextResponse} from 'next/server'

/**
 * @method GET
 * @route ~/api/articles/search
 * @description GET articles by search
 * @access  public
 */
export async function GET(request:NextRequest) {

try {
    const searchText=request.nextUrl.searchParams.get("searchText")
    let articles ;
    if(searchText) {
       articles=await db.select().from(ArticleTable).where(ilike(ArticleTable.title,`%${searchText}%`))
        
    }else {
        articles=await db.query.ArticleTable.findMany({limit:6,offset:0})

    }
    return NextResponse.json(articles,{status:200})


}catch(error) {
        return NextResponse.json({message:"internal server error"},{status:500})
}

    
}