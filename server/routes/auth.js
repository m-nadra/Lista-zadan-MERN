import { Router } from 'express'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'
import { hash, verify } from 'argon2'

const router = Router()

router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await hash(req.body.password)
        const user = await User({
            username: req.body.username,
            password: hashedPassword
        }).save()
        const token = jwt.sign({ id: user._id }, process.env.JWTPRIVATEKEY, { expiresIn: 60 * 15 })
        res.cookie("access_token", token, {
            maxAge: 1000 * 60 * 15,
            httpOnly: true
        })
        res.status(201).json({ message: "User created successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (await verify(user.password, req.body.password)) {
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

router.post("/logout", (_, res) => {
    res.clearCookie("access_token");
    res.status(204).end()
})

export default router