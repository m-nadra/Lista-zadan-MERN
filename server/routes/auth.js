import { Router } from 'express'
import { User, userSchema } from '../models/User.js'
import jwt from 'jsonwebtoken'
import { hash, verify } from 'argon2'

const router = Router()

router.post('/signup', async (req, res) => {
    try {
        const value = await userSchema.validateAsync(req.body)
        const user = await User.create({
            username: value.username,
            password: await hash(value.password)
        })
        const token = jwt.sign({ id: user._id }, process.env.JWTPRIVATEKEY, { expiresIn: 60 * 15 })
        res.cookie("access_token", token, {
            maxAge: 1000 * 60 * 15,
            httpOnly: true
        })
        res.status(201).json({ message: "User created successfully" })
    } catch (err) {
        if (err.isJoi)
            return res.status(400).json(err.details)
        res.status(500).json({ error: err.message });
    }
})

router.post("/login", async (req, res) => {
    try {
        const value = await userSchema.validateAsync(req.body)
        const user = await User.findOne({ username: value.username })
        if (!user)
            return res.status(404).json({ error: "User not found" })

        if (!await verify(user.password, value.password))
            return res.status(401).json({ error: "Invalid password" })

        const token = jwt.sign({ id: user._id }, process.env.JWTPRIVATEKEY, { expiresIn: 60 * 15 })
        res.cookie("access_token", token, {
            maxAge: 1000 * 60 * 15,
            httpOnly: true
        })
        res.status(204).end()
    } catch (err) {
        if (err.code === 11000)
            return res.status(409).json({ error: "User with this username already exists" })
        if (err.isJoi)
            return res.status(400).json(err.details)
        res.status(500).json({ error: err.message });
    }
})

router.post("/logout", (_, res) => {
    res.clearCookie("access_token");
    res.status(204).end()
})

export default router