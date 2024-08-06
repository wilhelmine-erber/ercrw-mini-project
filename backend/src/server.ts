import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {connect} from './db'
import todoRoutes from './routes/todo'
import userRoutes from './routes/user'

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

app.use('/user', userRoutes)


app.use((error: any, req:Request, res:Response, next:NextFunction) => {
    console.error(error)
    res.status(500).send("error")
  });

app.listen(process.env.PORT, ()=>{
    console.log(`Server started: http://localhost:${process.env.PORT}`);
})