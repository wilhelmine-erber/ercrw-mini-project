import express, { Request, Response, NextFunction } from 'express'
import {User} from '../models/User'

const app = express.Router()

app.route('/')
    .get()
    .post()

export default app