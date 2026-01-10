import { Schema, model } from "mongoose";

export const User = model('User', new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}))