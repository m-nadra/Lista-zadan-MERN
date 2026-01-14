import { Schema, model } from "mongoose";
import Joi from "joi";

export const User = model('User', new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}))

export const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})