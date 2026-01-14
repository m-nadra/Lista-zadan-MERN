import { Router } from 'express'
import { Task, taskSchema } from '../models/Task.js'
import jwt from "jsonwebtoken"

const router = Router()

router.use((req, res, next) => {
    try {
        const token = req.cookies.access_token
        if (!token) 
            return res.status(401).json({ error: "Unauthorized" })

        const payload = jwt.verify(token, process.env.JWTPRIVATEKEY)
        req.userId = payload.id
        next()
    } catch {
        return res.status(401).json({ error: "Invalid token" })
    }
})

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const value = await taskSchema.validateAsync(req.body)
        const task = await Task.create({
            ...value,
            user: req.userId
        })
        res.status(201).json(task)
    } catch (err) {
        if (err.isJoi)
            return res.status(400).json(err.details)
        res.status(500).json({ error: err.message });
    }
})

router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) 
            return res.status(404).json({ error: "Task not found" })
        
        if (task.user.toString() !== req.userId) 
            return res.status(403).json({ error: "You can only edit your own tasks" })
        
        const value = await taskSchema.validateAsync(req.body)
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, value)
        res.status(200).json(updatedTask)
    } catch (err) {
        if (err.isJoi)
            return res.status(400).json(err.details)
        res.status(500).json({ error: err.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) 
            return res.status(404).json({ error: "Task not found" })
        
        if (task.user.toString() !== req.userId) 
            return res.status(403).json({ error: "You can only remove your own tasks" })
        
        await Task.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router