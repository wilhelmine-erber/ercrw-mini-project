import {Request, Response, NextFunction} from 'express'
import { User } from '../models/User'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

// REGISTER
export async function register(req:Request, res:Response){
    const user = new User(req.body)
    user.password = await bcrypt.hash(user.password, 10)
    user.token = crypto.randomBytes(64).toString('hex')

    if(user){
        await user.save()
    }

    res.cookie('user-token', user.token, {maxAge: 1000*60*60*24*7, sameSite:'strict', httpOnly:true})

    res.status(200).send('register')
}

// LOGIN
export async function login(req:Request, res:Response, next:NextFunction) {
    const {email, password} = req.body
    const user = await User.findOne().where('email').equals(email)

    if(!user){
        const error = new Error('Diese Email existiert nicht')
        return next(error)
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    if(!passwordIsCorrect){
        const error = new Error('Das Passwort ist falsch')
        return next(error)
    }

    user.token = crypto.randomBytes(64).toString('hex')

    if(user){
        await user.save()
    }

    res.cookie('user-token', user.token, {maxAge:1000*60*60*24*7, sameSite:'strict', httpOnly:true})
    res.status(200).send('login')
}

// GET CURRENT USER
export async function getCurrentUser(req:Request, res:Response){
    const token = req.cookies['user-token']

    if(!token){
        return res.status(401).send('Du bist nicht eingeloggt')
    }

    const user = await User.findOne().where('token').equals(token)

    return res.status(200).send(user)
}

// LOGOUT
export async function logout (req:Request, res:Response){
    const token = req.cookies['user-token']
    const user = await User.findOne().where('token').equals(token)

    if(user){
        user.token = ''
        await user.save();
    }

    res.cookie('user-token', '', {maxAge: 1, sameSite:'strict', httpOnly: true})

    res.status(200).send('logout')
}

// UPDATE USER
export async function updateUser(req:Request, res:Response){
    const {username} = req.body

    const user = await User.findOne().where('token').equals(req.cookies['user-token'])

    if (user) {
        user.username = username;
        await user.save()
    }

    res.status(200).send(user)
}