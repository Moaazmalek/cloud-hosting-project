import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/db";
import { verifyToken } from "@/utils/verifyToken";
import { CreateCommentDto } from "@/utils/dtos";
import { CreateCommentSchema } from "@/utils/validationSchemas";
import { CommentTable } from "@/lib/drizzle/schema";
//route handlers
/**
 * @method POST
 * @route ~/api/comments
 * @description Create new comment
 * @access  private only logged in user
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "only logged in user, access denied" },
        { status: 401 }
      ); //401 unaothorized
    }
    const body = (await request.json()) as CreateCommentDto;
    const validation = CreateCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const newComment = await db
      .insert(CommentTable)
      .values({
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      })
      .returning();
    return NextResponse.json(newComment, { status: 201 }); //201 created
  } catch (error) {
    return NextResponse.json(
      { message: "internal srever error" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/comments
 * @description Get all comments
 * @access  private only (admin)
 */
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user  || !user.isAdmin) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      ); //403 forbidden
    }
    
    const comments = await db.query.CommentTable.findMany();

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal srever error" },
      { status: 500 }
    );
  }
}
