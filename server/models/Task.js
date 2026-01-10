import { Schema, model } from "mongoose";

export const Task = model('Task', new Schema({
    name: { type: String, required: true },
    description: String,
    date: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}))