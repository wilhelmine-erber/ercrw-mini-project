import express, { Request, Response, NextFunction } from 'express'
import {User} from '../models/User'
import { createHash } from 'crypto'
import validator from 'validator'

const app = express.Router()

// -> /user
app.route('/')
    .get(async (req:Request, res:Response, next:NextFunction)=>{
        try {
           const result = await User.find()
           res.json(result)
        } catch (error) {
            console.error('Kein User gefunden')
            next(error)
        }
    })
    .post(async (req:Request, res:Response, next:NextFunction)=>{   // register
        try {
            const sha256 = createHash('sha256')
            const newUser = req.body

            // Passwort validieren
            const isStrong = validator.isStrongPassword(newUser.password, {
                minNumbers: 2,
                minUppercase: 2,
                minSymbols: 2
            })
            if(!isStrong){
                throw new Error('weak password')
            }

            // Passwort hashen
            newUser.password = sha256.copy().update(newUser.password).digest('hex')

            // User in DB speichern
            await User.create(newUser)
            // token erstellen -> wie in /login
            // token im header zurückschicken (nicht json)

            res.status(201).send('User erfolgreich registriert')


        } catch (error) {
            next(error)
        }
    })

app.get('/:id', async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const user = await User.findOne({_id: req.params.id})
        res.json(user)
    } catch (error) {
        next(error)
    }
})

export default app

// 12345678ABab$$