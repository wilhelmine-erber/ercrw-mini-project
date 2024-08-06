import express, { Request, Response, NextFunction } from 'express'
import { createHash } from 'crypto'
import {User} from '../models/User'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express.Router()

// -> /login
app.route('/')
    .post(async (req:Request, res:Response, next:NextFunction)=>{
        const sha256 = createHash('sha256')

        try {
            const userName = req.body.userName
            const password = req.body.password

            const user = await User.findOne({userName})

            if(!user){
                throw new Error('User not found!')
            }

            // Überprüfe ob die gehashten Werte gleich sind
            const isValid = sha256.copy().update(password).digest('hex') === user.password

            if(!isValid){
                throw new Error('Invalid authentification')
            }

            // Token erstellen
            const token = jwt.sign(
                {iat: Date.now(), userId: user.id},
                process.env.JWT_SECRET!,
                {algorithm: 'HS256', expiresIn: '1m'}
            )
            res.json({token})
            
        } catch (error) {
            next(error)
        }
    })



export default app