import {NextRequest,NextResponse} from 'next/server'
import { Articles } from '@/utils/data'
import { UpdateArticleDto } from '@/utils/dtos';
import { CreateArticleSchema } from '@/utils/validationSchemas';
import { db } from '@/lib/database/db';
import { ArticleTable } from '@/lib/drizzle/schema';
import { eq } from 'drizzle-orm';
interface Props {
params:{
    id:string
}
}
/**
* @method GET
* @route ~/api/articles/:id
* @description GET Single article by id 
* @access  public  
*/
export async function GET(request:NextRequest,{params:{id}}:Props) {
    
      try {

        const article=await db.query.ArticleTable.findFirst({
            where:(article,{eq}) => eq(article.id,Number(id))
           })
         
            if(!article){
                return NextResponse.json({message:"article not found"},{status:404})
            }
            return NextResponse.json(article,{status:200})
          
      }catch(error) {
        return NextResponse.json({message:"internal server error"},{status:500})
        
      }
}

/**
* @method PUT
* @route ~/api/articles/:id
* @description Update  article by 
* @access  public  
*/
export async function PUT(request:NextRequest,{params:{id}}:Props) {
  try {
    const articleId=parseInt(id)
    if(isNaN(articleId)) {
        return NextResponse.json({message:"Invalid article id"},{status:404})
    }

    const {title,description}=await request.json() as UpdateArticleDto
    if(!title || !description ){
        return NextResponse.json({message:"title and description are required"},{status:404})
    }

    const updatedArticle=await db.update(ArticleTable).set({
        ...(title && {title}),
        ...(description && {description})
    }).
    where(eq(ArticleTable.id,articleId)).returning();
    
    if(updatedArticle.length===0){
        return NextResponse.json({message:"article not found"},{status:404})
    }
    return NextResponse.json({message:"Article updated",article:updatedArticle[0]},{status:200})

  }catch(error) {
    return NextResponse.json({message:"internal server error"},{status:500})
  }

}
/**
* @method DELETE
* @route ~/api/articles/:id
* @description Delete article
* @access  public  
*/
export async function DELETE(request:NextRequest,{params:{id}}:Props) {
try {
    const articleId=parseInt(id)
    if(isNaN(articleId)){
        return NextResponse.json({message:"Invalid Id"},{status:400})
    }
    const deleted=await db.delete(ArticleTable).where(eq(ArticleTable.id,articleId)).returning();
    if(deleted.length===0){
        return NextResponse.json({message:"article not found"},{status:404})
    }
    return NextResponse.json({message:"article deleted",article:deleted[0]},{status:200})

}catch(error) {
    return NextResponse.json({message:"Internal server error"},{status:500})

}

}

