import { hash, verify } from "argon2";
import { Router } from "express";
import logger from "../logger.js";
import { User, userSchema } from "../models/User.js";
import { access_token, deleteTokenfromRedis, refresh_token } from "../token.js";

const router = Router();

router.post("/signup", async (req, res) => {
	try {
		logger.info("Signup attempt", { username: req.body.username });
		const value = await userSchema.validateAsync(req.body);
		const user = await User.create({
			username: value.username,
			password: await hash(value.password),
		});
		logger.info("User created successfully", {
			userId: user._id,
			username: user.username,
		});
		res.cookie("access_token", await access_token(user._id), {
			maxAge: 1000 * 60 * 15,
			httpOnly: true,
		});
		res.status(201).json({ message: "User created successfully" });
	} catch (err) {
		logger.error("Signup error", {
			error: err.message,
			username: req.body.username,
		});
		if (err.code === 11000)
			return res
				.status(409)
				.json({ error: "User with this username already exists" });
		if (err.isJoi) return res.status(400).json(err.details);
		res.status(500).json({ error: err.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		logger.info("Login attempt", { username: req.body.username });
		const value = await userSchema.validateAsync(req.body);
		const user = await User.findOne({ username: value.username });
		if (!user) {
			logger.warn("Login failed - user not found", {
				username: value.username,
			});
			return res.status(404).json({ error: "User not found" });
		}

		if (!(await verify(user.password, value.password))) {
			logger.warn("Login failed - invalid password", {
				userId: user._id,
				username: user.username,
			});
			return res.status(401).json({ error: "Invalid password" });
		}
		res.cookie("access_token", await access_token(user._id), {
			maxAge: 1000 * 60 * 15,
			httpOnly: true,
		});
		res.cookie("refresh_token", await refresh_token(user._id), {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
		});

		logger.info("Login successful", {
			userId: user._id,
			username: user.username,
		});
		res.status(204).end();
	} catch (err) {
		logger.error("Login error", {
			error: err.message,
			username: req.body.username,
		});
		if (err.isJoi) return res.status(400).json(err.details);
		res.status(500).json({ error: err.message });
	}
});

router.post("/logout", async (req, res) => {
	logger.info("Logout attempt", { ip: req.ip });
	res.clearCookie("access_token");
	await deleteTokenfromRedis(req.cookies.refresh_token);
	res.clearCookie("refresh_token");
	res.status(204).end();
});

export default router;
