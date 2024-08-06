import { Request, Response, NextFunction } from 'express'
import {connect} from './db'
import jwt from 'jsonwebtoken'

interface Payload{
    iat: number
    userId: string
}

export async function jwtAuthentification(req:Request, res:Response, next:NextFunction){
    try{
        await connect()

        const accessToken = req.body.accessToken

        const payload = jwt.verify(accessToken, process.env.JWT_SECRET!) as Payload

        if(!payload){
            throw new Error('Invalid Token')
        }

        if(payload.iat + 1000 * 60 < Date.now()){
            throw new Error('Invalid: old')
        }

        next()


    }catch(error){
        next(error)
    }
}

// soltte diese middleware nicht besser jwt / token / verfy oä heißen?