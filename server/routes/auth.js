import { hash, verify } from "argon2";
import { Router } from "express";
import logger from "../logger.js";
import { User, userSchema } from "../models/User.js";
import {
	deleteTokenfromRedis,
	getAccessToken,
	getPayloadfromToken,
	getRefreshToken,
	verifyRefreshTokenPayload
} from "../token.js";

const router = Router();

router.post("/signup", async (req, res) => {
	try {
		logger.info("Signup attempt", { username: req.body.username });
		const value = await userSchema.validateAsync(req.body);
		const user = await User.create({
			username: value.username,
			password: await hash(value.password)
		});
		res.cookie("refreshToken", await getRefreshToken(user._id), {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production"
		});
		logger.info("User created successfully", {
			userId: user._id,
			username: user.username
		});
		res.status(201).json({
			message: "User created successfully",
			accessToken: await getAccessToken(user._id),
			type: "Bearer"
		});
	} catch (err) {
		logger.error("Signup error", {
			error: err.message,
			username: req.body.username
		});
		if (err.code === 11000)
			return res.status(409).json({ error: "User with this username already exists" });
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
				username: value.username
			});
			return res.status(404).json({ error: "User not found" });
		}

		if (!(await verify(user.password, value.password))) {
			logger.warn("Login failed - invalid password", {
				userId: user._id,
				username: user.username
			});
			return res.status(401).json({ error: "Invalid password" });
		}
		res.cookie("refreshToken", await getRefreshToken(user._id), {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production"
		});
		logger.info("Login successful", {
			userId: user._id,
			username: user.username
		});
		res.status(200).json({
			message: "Login successful",
			accessToken: await getAccessToken(user._id),
			type: "Bearer"
		});
	} catch (err) {
		logger.error("Login error", {
			error: err.message,
			username: req.body.username
		});
		if (err.isJoi) return res.status(400).json(err.details);
		res.status(500).json({ error: err.message });
	}
});

router.post("/logout", async (req, res) => {
	logger.info("Logout attempt", { ip: req.ip });
	await deleteTokenfromRedis(req.cookies.refreshToken);
	res.clearCookie("refreshToken");
	res.status(204).end();
});

router.post("/refresh", async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) {
			logger.warn("Unauthorized access attempt - no token", {
				ip: req.ip,
				path: req.path
			});
			return res.status(401).json({ error: "Unauthorized - no token" });
		}
		const payload = await getPayloadfromToken(refreshToken);
		if (!verifyRefreshTokenPayload(payload)) {
			logger.warn("Unauthorized access attempt - invalid token", {
				ip: req.ip,
				path: req.path
			});
			return res.status(401).json({ error: "Unauthorized - invalid token" });
		}
		res.cookie("refreshToken", await getRefreshToken(payload.id), {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production"
		});
		logger.info("Tokens has been refreshed");
		res.status(201).json({
			message: "Access token created",
			accessToken: await getAccessToken(payload.id),
			type: "Bearer"
		});
	} catch (err) {
		logger.warn("Unauthorized access attempt - invalid token", {
			ip: req.ip,
			path: req.path,
			error: err.message
		});
		return res.status(401).json({ error: "Invalid token" });
	}
});
export default router;
