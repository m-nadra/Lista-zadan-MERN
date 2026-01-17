import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import tasks from './routes/tasks.js'
import auth from './routes/auth.js'
import morgan from 'morgan';

const port = process.env.PORT
const app = express()

app.use(morgan(':date - :method :url - :status'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to the database"))
    .catch(err => console.error(err))

app.use('/api/tasks', tasks)
app.use('/api', auth)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})