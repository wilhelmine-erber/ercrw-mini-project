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
    .post(async (req:Request, res:Response, next:NextFunction)=>{

        if(!req.body || Object.keys(req.body).length === 0){
            return res.status(400).json({error: 'Body content is required'})
        }
    
        try{
            const newTodo = await Todo.create(req.body)
            res.json(newTodo)
    
        }catch(error){
            next(error)
        }
    })

app.get('/:id', async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const todo = await Todo.findOne({_id: req.params.id})
        res.json(todo)

    }catch(error){
        next(error)
    }
})

app.put('/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const id = req.params.id
        const result = await Todo.findByIdAndUpdate({_id:id}, req.body, {runValidators: true, new: true})
        res.json(result)

    }catch(error){
        next(error)
    }
})

app.delete('/:id',  async(req:Request, res:Response, next:NextFunction) => {
    try{
        const id= req.params.id
        await Todo.deleteOne({_id:id})
        res.sendStatus(204)

    }catch(error){
        next(error)
    }
})

export default app