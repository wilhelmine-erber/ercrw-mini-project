import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

export async function connect(){
    try{
        if(!process.env.MONGODB_URL){
            throw new Error('Error: MONGOBD_URL is not defined')
        }
        await mongoose.connect(process.env.MONGODB_URL)
    }catch(error){
        console.error(error)
    }
}