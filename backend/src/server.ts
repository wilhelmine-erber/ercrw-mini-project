import express, { NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {connect} from './db'
import {Todo} from './models/Todo'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use(async (req, res, next) => {
    try{
        await connect()
        next()
    }catch(error){
        next(error)
    }
})


app.get('/todo', async (req, res, next)=>{
    try{
        const result = await Todo.find()
        res.json(result)
    }catch(error){
        next(error)
    }
})

app.get('/todo/:id', async (req, res, next)=>{
    try{
        const todo = await Todo.findOne({_id: req.params.id})
        res.json(todo)

    }catch(error){
        next(error)
    }
})


app.post('/todo', async (req, res, next)=>{
    try{
        const newTodo = await Todo.create(req.body)
        res.json(newTodo)

    }catch(error){
        next(error)
    }
})


app.put('/todo/:id', async(req, res, next)=>{
    try{
        const id = req.params.id
        const result = await Todo.findByIdAndUpdate({_id:id}, req.body, {runValidators: true, new: true})
        res.json(result)

    }catch(error){
        next(error)
    }
})


app.delete('/todo/:id', async(req, res, next) => {
    try{
        const id= req.params.id
        await Todo.deleteOne({_id:id})
        res.sendStatus(204)

    }catch(error){
        next(error)
    }
})

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     console.error(err)
//     res.status(500).send("error")
//   });

app.listen(process.env.PORT, ()=>{
    console.log(`Server started: http://localhost:${process.env.PORT}`);
})