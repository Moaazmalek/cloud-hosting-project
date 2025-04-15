import { db } from "@/lib/database/db";
import { UserTable } from "@/lib/drizzle/schema";
import { LoginUserDto } from "@/utils/dtos";
import { ValidateLoginSchema } from "@/utils/validationSchemas";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";

//route handlers
/**
 * @method POST
 * @route ~/api/users/login
 * @description Login User
 * @access  public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;
    const validate = ValidateLoginSchema.safeParse(body);
    if (!validate.success) {
      return NextResponse.json(
        { message: validate.error.errors[0].message },
        { status: 400 }
      );
    }
    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.email, body.email),
    });
    if (!user) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }
    const validePassword = await bcrypt.compare(body.password, user.password);
    if (!validePassword) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }
    const jwtPayload = {
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    };

    // const token = generateJWT(jwtPayload);

    // const cookie=serialize("jwtToken",token,{
    //   httpOnly:true,
    //   secure:process.env.NODE_ENV === 'production' ,
    //   sameSite:'strict',
    //   path:'/',//all paths can use this cookie,
    //   maxAge:60 * 60 * 24 * 30 // one month,
    // })
    const cookie=setCookie(jwtPayload)


    return NextResponse.json(
      { message: "Authenticated" },
      { status: 200 ,
        headers:{
          "Set-Cookie":cookie
        }
       }
    );
    
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
