import { Router } from 'express'
import { User } from '../models/User.js'

const router = Router()

router.post('/signup', async (req, res) => {
    try {
        await User(req.body).save()
        res.status(201).send({ message: "User created successfully!" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router