import mongoose from "mongoose"
import validator from 'validator'

export interface IUser{
    username: string
    email: string
    password: string
    token:string
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email: string){
                return validator.isEmail(email)
            },
            message: 'Email is correct!',
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    token:{
        type:String
    }
    
}, 
{timestamps: true}
)

export const User = mongoose.model<IUser>('user', userSchema)