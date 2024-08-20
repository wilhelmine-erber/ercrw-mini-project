import express, { Request, Response, NextFunction } from 'express'
import {User} from '../models/User'
import { createHash } from 'crypto'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const app = express.Router()

// -> /user
app.route('/')
    .get(async (req:Request, res:Response, next:NextFunction)=>{
        try {
           const result = await User.find()
           res.json(result)
        } catch (error) {
            console.error('Kein User gefunden')
            res.status(500).json({message: 'Serverfehler: Benutzer konnte nicht gefunden werden'})
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
               return res.status(400).json({
                message: 'Das Passwort ist zu schwach. Es muss mindestens 2 Zahlen, 2 Großbuchstaben und 2 Symbole enthalten.'
            })
            }

            // Passwort hashen
            newUser.password = sha256.copy().update(newUser.password).digest('hex')

            // User in DB speichern
            await User.create(newUser)
            // token erstellen -> wie in /login

            const token = jwt.sign(
                {iat: Date.now(), userId: newUser.id},
                process.env.JWT_SECRET!,
                {algorithm: 'HS256', expiresIn: '1m'}
            )

            // token im header zurückschicken (nicht json)
            res.setHeader('Authorization', token)
            res.status(201).send('User erfolgreich registriert')


        } catch (error) {
            console.error('Fehler bei der Benutzerregistrierung.', error)
            res.status(500).json({message: 'Serverfehler: Benutzer konnte nicht registriert werden'})
        }
    })

app.get('/:id', async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const user = await User.findOne({_id: req.params.id})
        if(!user){
            return res.status(404).json({message: 'Benutzer nicht gefunden'})
        }
        res.json(user)
    } catch (error) {
        console.error('Fehler bei der Benutzersuche.', error)
        res.status(500).json({message: 'Serverfehler: Benutzer konnte nicht gefunden werden'})
    }
})

export default app

// 12345678ABab$$