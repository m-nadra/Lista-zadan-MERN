import { Router } from 'express'
import { Task } from '../models/Task.js'
import jwt from "jsonwebtoken"

const router = Router()

router.use(async (req, res, next) => {
    try {
        if (!req.cookies.access_token) {
            res.status(401).json({ error: "Unauthorized" })
        }
        else {
            req.id = jwt.verify(req.cookies.access_token, process.env.JWTPRIVATEKEY).id
            next()
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.id });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/tasks', async (req, res) => {
    try {
        const task = new Task({
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            user: req.id
        })
        await task.save()
        res.status(201).json({ message: "Task added successfully!" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router