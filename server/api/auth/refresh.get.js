import { sendError, use } from "h3"
import { getRefreshTokenByToken } from "~/server/db/refreshToken"
import { getUserById } from "~/server/db/users"
import { decodeRefreshToken, generateTokens } from "~/server/utils/jwt"

export default defineEventHandler( async (event)=> {
    const cookies = parseCookies(event)
    const refrshToken = cookies.refresh_token

    if(!refrshToken){
        return sendError(event, createError({
            statusCode:401,
            statusMessage:"Refresh token is invalid!"
        }))
    }

    // Check the refresh token is in db or not
    const rToken = await getRefreshTokenByToken(refrshToken)
    if(!rToken){
        return sendError(event, createError({
            statusCode:401,
            statusMessage:"Refresh token is invalid!"
        }))
    }

    const token = decodeRefreshToken(refrshToken)
    try {
        const user =await getUserById(token.userId)
        const {accessToken} = generateTokens(user)
        return {
            access_token:accessToken
        }
    } catch (error) {
        return sendError(event, createError({
            statusCode:500,
            statusMessage:"Something went wrong!"
        }))
    }
})