import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/database/db";
import { verifyToken } from "@/utils/verifyToken";
import { CommentTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { use } from "react";
import { UpdateCommentDto } from "@/utils/dtos";

interface Props {
  params: {
    id: string;
  };
}
//route handlers
/**
 * @method PUT
 * @route ~/api/users/comments/:id
 * @description Update comment
 * @access  private (only user himself can update his comment)
 */
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const result = await db
      .select()
      .from(CommentTable)
      .where(eq(CommentTable.id, parseInt(params.id)))
      .limit(1);
    const comment = result[0];
    if (!comment) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }
    const user = verifyToken(request);
    if (!user || user.id !== comment.userId) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as UpdateCommentDto;
    const updatedComment = await db.update(CommentTable).set({
      text: body.text,
    }).where(eq(CommentTable.id,parseInt(params.id))).returning();
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

//route handlers
/**
 * @method DELETE
 * @route ~/api/users/comments/:id
 * @description Delete comment
 * @access  private (only admin or ownder of the comment)
 */
export async function DELETE(request:NextRequest,{params}:Props) {
    try {
        const result = await db
          .select()
          .from(CommentTable)
          .where(eq(CommentTable.id, parseInt(params.id)))
          .limit(1);
        const comment = result[0];
        if (!comment) {
          return NextResponse.json({ message: "not found" }, { status: 404 });
        }
        const user = verifyToken(request);
        if(!user) {
            return NextResponse.json({message:"no token provided, access denied"},{status:401})
        }
        if(user.isAdmin || user.id ==comment.userId) {
const deletedComment=await db.delete(CommentTable).where(eq(CommentTable.id,comment.id))
return NextResponse.json({message:"comment deleted"},{status:200})
        } else {
            return NextResponse.json({message:"you are not allowed, access denied "},{status:403})
        }
       
      } catch (error) {
        return NextResponse.json(
          { message: "internal server error" },
          { status: 500 }
        );
      }
    
}