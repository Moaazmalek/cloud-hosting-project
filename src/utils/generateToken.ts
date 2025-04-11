import jwt from 'jsonwebtoken'
import { JWTPayload } from './types'
import { serialize } from 'cookie'
//Generate JWT Token
export function generateJWT(jwtPayload:JWTPayload):string {
    return jwt.sign(jwtPayload,process.env.JWT_SECRET as string,{
        expiresIn:'30d'
    })
}
//Set Cookie with JWT

export function setCookie (jwtPayload:JWTPayload) {
    const token=generateJWT(jwtPayload)
    const cookie=serialize("jwtToken",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        maxAge:30 * 24 * 60 * 60,
        path:'/',
        sameSite:'strict'
    })
    return cookie


}
