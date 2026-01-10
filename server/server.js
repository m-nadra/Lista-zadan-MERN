import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import tasks from './routes/tasks.js'
import auth from './routes/auth.js'

const port = process.env.PORT
const app = express()

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Połączono z bazą danych."))
    .catch(err => console.error(err))

app.use(express.json())
app.use(cors())
app.use('/api', tasks)
app.use('/', auth)

app.listen(port, () => {
    console.log(`Serwer uruchomiony na porcie ${port}`)
})