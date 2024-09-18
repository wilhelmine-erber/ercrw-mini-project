import { User, IUser } from "../../models/User";
import { Request, Response, NextFunction } from 'express'

interface CustomRequest extends Request {
    user: IUser;
}

export async function auth(req:CustomRequest, res:Response, next:NextFunction){
    const token = req.cookies['user-token']
    
    if(!token){
        const error = new Error('Du bist nicht eingeloggt')
        return next(error)
    }

    const user = await User.findOne().where('token').equals(token)

    if(!user){
        const error = new Error('Dein Token ist ungültig')
        return next(error)
    }

    req.user = user
    next()
}