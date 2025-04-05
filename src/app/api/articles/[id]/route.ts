import {NextRequest,NextResponse} from 'next/server'
import { Articles } from '@/utils/data'
import { UpdateArticleDto } from '@/utils/dtos';
import { CreateArticleSchema } from '@/utils/validationSchemas';
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
export function GET(request:NextRequest,{params:{id}}:Props) {
    const article=Articles.find((a)  => a.id===parseInt(id));
    if(!article) {
        return NextResponse.json({message:"Article not found"},{status:404})
    }
    return NextResponse.json(article,{status:200})


}

/**
* @method PUT
* @route ~/api/articles/:id
* @description Update  article by 
* @access  public  
*/
export async function PUT(request:NextRequest,{params:{id}}:Props) {
    const body=await request.json() as UpdateArticleDto;
    console.log(body)


    const article=Articles.find((a)  => a.id===parseInt(id));
    if(!article) {
        return NextResponse.json({message:"Article not found"},{status:404})
    }
    return NextResponse.json({message:"Article updated"},{status:200})


}
/**
* @method DELETE
* @route ~/api/articles/:id
* @description Delete article
* @access  public  
*/
export async function DELETE(request:NextRequest,{params:{id}}:Props) {

    const article=Articles.find((a)  => a.id===parseInt(id));
    if(!article) {
        return NextResponse.json({message:"Article not found"},{status:404})
    }
    return NextResponse.json({message:"Article Deleted"},{status:200})


}

