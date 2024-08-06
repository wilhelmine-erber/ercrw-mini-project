import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {connect} from './db'
import {Todo} from './models/Todo'
import todoRoutes from './routes/todo'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use(async (req:Request, res:Response, next:NextFunction) => {
    try{
        await connect()
        next()
    }catch(error){
        next(error)
    }
})

app.use('/todo', todoRoutes)

// app.get('/todo', async (req:Request, res:Response, next:NextFunction)=>{
//     try{
//         const result = await Todo.find()
//         res.json(result)
//     }catch(error){
//         next(error)
//     }
// })

app.get('/todo/:id', async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const todo = await Todo.findOne({_id: req.params.id})
        res.json(todo)

    }catch(error){
        next(error)
    }
})


app.post('/todo', async (req:Request, res:Response, next:NextFunction)=>{

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


app.put('/todo/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const id = req.params.id
        const result = await Todo.findByIdAndUpdate({_id:id}, req.body, {runValidators: true, new: true})
        res.json(result)

    }catch(error){
        next(error)
    }
})


app.delete('/todo/:id', async(req:Request, res:Response, next:NextFunction) => {
    try{
        const id= req.params.id
        await Todo.deleteOne({_id:id})
        res.sendStatus(204)

    }catch(error){
        next(error)
    }
})

app.use((error: any, req:Request, res:Response, next:NextFunction) => {
    console.error(error)
    res.status(500).send("error")
  });

app.listen(process.env.PORT, ()=>{
    console.log(`Server started: http://localhost:${process.env.PORT}`);
})