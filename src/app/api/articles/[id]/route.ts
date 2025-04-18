import { NextRequest, NextResponse } from "next/server";
import { Articles } from "@/utils/data";
import { UpdateArticleDto } from "@/utils/dtos";
import { CreateArticleSchema } from "@/utils/validationSchemas";
import { db } from "@/lib/database/db";
import { ArticleTable, CommentTable } from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { verifyToken } from "@/utils/verifyToken";
interface Props {
  params: {
    id: string;
  };
}
/**
 * @method GET
 * @route ~/api/articles/:id
 * @description GET Single article by id
 * @access  public
 */
export async function GET(request: NextRequest, { params: { id } }: Props) {
  try {
    const article = await db.query.ArticleTable.findMany({
      where: (ArticleTable, { eq }) => eq(ArticleTable.id, Number(id)),
      with: {
        comments: {
          orderBy: (CommentTable, { desc }) => [desc(CommentTable.createdAt)],
          with:{
            user:{
                columns:{
                    username:true,
                    email:true
                }
            }
          }
        },
        user:true
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @description Update  article by
 * @access  private  admin or user himself can update the article
 */
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "not allowed,access denied" },
        { status: 403 }
      );
    }

    const articleId = parseInt(id);
    if (isNaN(articleId)) {
      return NextResponse.json(
        { message: "Invalid article id" },
        { status: 404 }
      );
    }

    const { title, description } = (await request.json()) as UpdateArticleDto;
    if (!title || !description) {
      return NextResponse.json(
        { message: "title and description are required" },
        { status: 404 }
      );
    }

    const updatedArticle = await db
      .update(ArticleTable)
      .set({
        ...(title && { title }),
        ...(description && { description }),
      })
      .where(
        and(eq(ArticleTable.id, articleId), eq(ArticleTable.userId, user.id))
      )
      .returning();

    if (updatedArticle.length === 0) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Article updated", article: updatedArticle[0] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @description Delete article
 * @access  public
 */
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "not allow, access denied" },
        { status: 403 }
      );
    }
    const articleId = parseInt(id);
    if (isNaN(articleId)) {
      return NextResponse.json({ message: "Invalid Id" }, { status: 400 });
    }
    const deleted = await db
      .delete(ArticleTable)
      .where(
        and(eq(ArticleTable.id, articleId), eq(ArticleTable.userId, user.id))
      )
      .returning();
    if (deleted.length === 0) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "article deleted", article: deleted[0] },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
