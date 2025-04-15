import { db } from "@/lib/database/db";
import { UserTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos";

interface Props {
  params: {
    id: string;
  };
}

//route handlers
/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @description DELETE Profile
 * @access  private (only user himself can delete his account)
 */

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  try {
    const userId = parseInt(id);
    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.id, userId),
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken !== null && userFromToken.id === user.id) {
      await db.delete(UserTable).where(eq(UserTable.id, userId));
      return NextResponse.json(
        { message: "your profile (account) has been deleted" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "only user himself can delete this profile, forbidden" },
      { status: 403 }
    ); //403 forbidden
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

//GET
/**
 * @method GET
 * @route ~/api/users/profile/:id
 * @description GET Profile By Id
 * @access  private (only user himself can get his profile)
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.id, parseInt(params.id)),
      columns: {
        password: false,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken == null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

//PUT
/**
 * @method PUT
 * @route ~/api/users/profile/:id
 * @description update Profile
 * @access  private (only user himself can update his profile)
 */
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.id, parseInt(params.id)),
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken == null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as UpdateUserDto;

    if (body.password) {
      if (body.password.length < 6) {
        return NextResponse.json(
          { message: "password should be minimum 6 characters" },
          { status: 400 }
        );
      }
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    const updatedUser = await db
      .update(UserTable)
      .set({
        username: body.username?.trim() || user.username,
        email: body.email?.trim() || user.email,
        password: body.password?.trim() || user.password,
      })
      .where(eq(UserTable.id, user.id))
      .returning();
    const { password, ...others } = updatedUser[0];
    return NextResponse.json({ ...others }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
