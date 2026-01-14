import { Schema, model } from "mongoose";
import Joi from "joi";

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

export const taskSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional().allow(''),
    date: Joi.date().optional().allow('')
})