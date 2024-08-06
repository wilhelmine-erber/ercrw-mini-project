import express, { Request, Response, NextFunction } from 'express'
import {Todo} from '../models/Todo'

const app = express.Router()

// -> /todo
app.route('/')
    .get(async (req:Request, res:Response, next:NextFunction)=>{
        try{
            const result = await Todo.find()
            res.json(result)
        }catch(error){
            next(error)
        }
    })
    .post()

app.get('/:id')

export default app