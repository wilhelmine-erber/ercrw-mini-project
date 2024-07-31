import {model, Schema} from 'mongoose'

interface ITodo {
    title: string
    description?: string
    done: boolean
}

const todoSchema = new Schema<ITodo>(
    {
        title: {type: String, required: true, minlength: 2},
        description: String,
        done: {type: Boolean, default: false}
    },
    {timestamps: true}
)

export const Todo = model<ITodo>('todo', todoSchema)