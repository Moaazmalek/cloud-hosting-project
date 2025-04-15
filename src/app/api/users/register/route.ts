import { db } from "@/lib/database/db";
import { UserTable } from "@/lib/drizzle/schema";
import { RegisterUserDto } from "@/utils/dtos";
import { JWTPayload, RegisterSchema } from "@/utils/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";

//route handlers
/**
 * @method POST
 * @route ~/api/users/register
 * @description create new user
 * @access  public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;

    // validate the register information
    const validation = RegisterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const existing = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, body.email))
      .limit(1);
    if (existing.length > 0) {
      return NextResponse.json(
        { message: "this user already registered" },
        { status: 409 }
      );
    }
    const safeUserFields = {
      id: UserTable.id,
      username: UserTable.username,
      createdAt: UserTable.createdAt,
      isAdmin: UserTable.isAdmin,
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const newUser = await db
      .insert(UserTable)
      .values({
        username: body.username,
        email: body.email,
        password: hashedPassword,
      })
      .returning(safeUserFields);

    const user = newUser[0];
    const jwtPayload: JWTPayload = {
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    };

    const cookie = setCookie(jwtPayload);
    return NextResponse.json({ ...newUser[0],message:"Registered & Authenticated"},
         { status: 201 ,
            headers:{
                "Set-Cookie":cookie
            }
         });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
