import { Router } from 'express'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/signup', async (req, res) => {
    try {
        await User(req.body).save()
        res.status(201).send({ message: "User created successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user.password === req.body.password) {
            const token = jwt.sign({ id: user._id }, process.env.JWTPRIVATEKEY, { expiresIn: 60 * 15 })
            res.cookie("access_token", token, {
                maxAge: 1000 * 60 * 15,
                httpOnly: true
            })
            res.status(204).end()
        } else {
            res.status(401).json({ error: "Invalid credentials" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router