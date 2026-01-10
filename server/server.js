import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import tasks from './routes/tasks.js'
import auth from './routes/auth.js'

const port = process.env.PORT
const app = express()

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to the database"))
    .catch(err => console.error(err))

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use('/api', tasks)
app.use('/', auth)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})