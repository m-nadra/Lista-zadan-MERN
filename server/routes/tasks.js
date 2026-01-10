import { Router } from 'express'
import { Task } from '../models/Task.js'

const router = Router()

router.get('/tasks', async (_, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/tasks', async (req, res) => {
    try {
        await Task(req.body).save()
        res.status(201).json({ message: "Task added successfully!" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router