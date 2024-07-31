import express from 'express'
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


app.post('/todo', async (req, res, next)=>{
    try{
        const newTodo = await Todo.create(req.body)
        res.json(newTodo)

    }catch(error){
        next(error)
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server started: http://localhost:${process.env.PORT}`);
})